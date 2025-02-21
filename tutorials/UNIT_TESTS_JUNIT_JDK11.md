# Tutorial de Testes Unitários com Spring Boot

## Índice
1. Introdução
2. Configuração do Ambiente
3. Testando Classes de Serviço
4. Testando Controllers
5. Boas Práticas
6. Exemplos Completos

## 1. Introdução

Este tutorial vai mostrar como criar testes unitários para aplicações Spring Boot usando JUnit 5, Mockito e AssertJ. Vamos cobrir testes tanto para camadas de serviço quanto para controllers.

## 2. Configuração do Ambiente

### 2.1 Configuração com Maven

Primeiro, adicione as dependências necessárias no seu `pom.xml`:

```xml
<dependencies>
    <!-- Spring Boot Starter Test (inclui JUnit 5) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### Configuração com Gradle

Para projetos usando Gradle, adicione as dependências no seu `build.gradle`:

```gradle
dependencies {
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'com.github.tomakehurst:wiremock-jre8:2.35.0'
    
    // Para usar Jupiter API explicitamente
    testImplementation 'org.junit.jupiter:junit-jupiter-api:5.8.2'
    testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:5.8.2'
}

test {
    useJUnitPlatform()
}
```

## 3. Testando Classes de Serviço

### 3.1 Estrutura Básica

Vamos usar como exemplo um serviço de usuários:

```java
@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public Usuario criarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
            .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não encontrado"));
    }
}
```

### 3.2 Classe de Teste

```java
@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {
    
    @Mock
    private UsuarioRepository usuarioRepository;
    
    @InjectMocks
    private UsuarioService usuarioService;
    
    @Test
    void deveCriarUsuarioComSucesso() {
        // Arrange
        Usuario usuario = new Usuario("João", "joao@email.com");
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);
        
        // Act
        Usuario usuarioCriado = usuarioService.criarUsuario(usuario);
        
        // Assert
        assertThat(usuarioCriado).isNotNull();
        assertThat(usuarioCriado.getNome()).isEqualTo("João");
        verify(usuarioRepository).save(any(Usuario.class));
    }
    
    @Test
    void deveLancarExcecaoQuandoUsuarioNaoEncontrado() {
        // Arrange
        Long id = 1L;
        when(usuarioRepository.findById(id)).thenReturn(Optional.empty());
        
        // Act & Assert
        assertThrows(UsuarioNaoEncontradoException.class, 
            () -> usuarioService.buscarPorId(id));
    }
}
```

## 4. Testando Controllers

### 4.1 Exemplo de Controller

```java
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario) {
        Usuario novoUsuario = usuarioService.criarUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        return ResponseEntity.ok(usuario);
    }
}
```

### 4.2 Classe de Teste do Controller

```java
@WebMvcTest(UsuarioController.class)
class UsuarioControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UsuarioService usuarioService;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void deveCriarUsuarioComSucesso() throws Exception {
        // Arrange
        Usuario usuario = new Usuario("Maria", "maria@email.com");
        when(usuarioService.criarUsuario(any(Usuario.class))).thenReturn(usuario);
        
        // Act & Assert
        mockMvc.perform(post("/api/usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(usuario)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.nome").value("Maria"))
            .andExpect(jsonPath("$.email").value("maria@email.com"));
    }
    
    @Test
    void deveBuscarUsuarioComSucesso() throws Exception {
        // Arrange
        Long id = 1L;
        Usuario usuario = new Usuario("Maria", "maria@email.com");
        when(usuarioService.buscarPorId(id)).thenReturn(usuario);
        
        // Act & Assert
        mockMvc.perform(get("/api/usuarios/{id}", id))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nome").value("Maria"))
            .andExpect(jsonPath("$.email").value("maria@email.com"));
    }
    
    @Test
    void deveRetornarStatus404QuandoUsuarioNaoEncontrado() throws Exception {
        // Arrange
        Long id = 1L;
        when(usuarioService.buscarPorId(id))
            .thenThrow(new UsuarioNaoEncontradoException("Usuário não encontrado"));
        
        // Act & Assert
        mockMvc.perform(get("/api/usuarios/{id}", id))
            .andExpect(status().isNotFound());
    }
}
```

## 5. Testando Integrações com Serviços Externos

### 5.1 Exemplo de Serviço com Integração Externa

```java
@Service
public class NotificacaoService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Value("${notificacao.api.url}")
    private String apiUrl;
    
    public NotificacaoResponse enviarNotificacao(NotificacaoRequest request) {
        return restTemplate.postForObject(
            apiUrl + "/notificacoes",
            request,
            NotificacaoResponse.class
        );
    }
}

@Service
public class PedidoService {
    
    @Autowired
    private NotificacaoService notificacaoService;
    
    public void processarPedido(Pedido pedido) {
        // Lógica de processamento do pedido
        
        // Enviar notificação
        NotificacaoRequest notificacao = new NotificacaoRequest(
            pedido.getClienteId(),
            "Seu pedido #" + pedido.getId() + " foi processado!"
        );
        
        notificacaoService.enviarNotificacao(notificacao);
    }
}
```

### 5.2 Teste do Serviço com Mock do RestTemplate

```java
@ExtendWith(MockitoExtension.class)
class NotificacaoServiceTest {
    
    @Mock
    private RestTemplate restTemplate;
    
    @InjectMocks
    private NotificacaoService notificacaoService;
    
    @Value("${notificacao.api.url}")
    private String apiUrl;
    
    @Test
    void deveEnviarNotificacaoComSucesso() {
        // Arrange
        NotificacaoRequest request = new NotificacaoRequest(
            1L, "Mensagem de teste"
        );
        NotificacaoResponse expectedResponse = new NotificacaoResponse(
            "SUCCESS", "Notificação enviada"
        );
        
        when(restTemplate.postForObject(
            apiUrl + "/notificacoes",
            request,
            NotificacaoResponse.class
        )).thenReturn(expectedResponse);
        
        // Act
        NotificacaoResponse response = notificacaoService
            .enviarNotificacao(request);
        
        // Assert
        assertThat(response).isNotNull();
        assertThat(response.getStatus()).isEqualTo("SUCCESS");
        verify(restTemplate).postForObject(
            eq(apiUrl + "/notificacoes"),
            eq(request),
            eq(NotificacaoResponse.class)
        );
    }
}
```

### 5.3 Teste com WireMock

```java
@SpringBootTest
class NotificacaoServiceIntegrationTest {
    
    @Autowired
    private NotificacaoService notificacaoService;
    
    private WireMockServer wireMockServer;
    
    @BeforeEach
    void setup() {
        wireMockServer = new WireMockServer(WireMockConfiguration.options().port(8089));
        wireMockServer.start();
        WireMock.configureFor("localhost", 8089);
    }
    
    @AfterEach
    void teardown() {
        wireMockServer.stop();
    }
    
    @Test
    void deveEnviarNotificacaoUsandoWireMock() {
        // Arrange
        NotificacaoRequest request = new NotificacaoRequest(
            1L, "Mensagem de teste"
        );
        
        stubFor(post(urlEqualTo("/notificacoes"))
            .withRequestBody(containing("Mensagem de teste"))
            .willReturn(aResponse()
                .withStatus(200)
                .withHeader("Content-Type", "application/json")
                .withBody("{\"status\":\"SUCCESS\",\"message\":\"Notificação enviada\"}")
            ));
        
        // Act
        NotificacaoResponse response = notificacaoService
            .enviarNotificacao(request);
        
        // Assert
        assertThat(response).isNotNull();
        assertThat(response.getStatus()).isEqualTo("SUCCESS");
        
        // Verify the request was made
        verify(postRequestedFor(urlEqualTo("/notificacoes"))
            .withRequestBody(containing("Mensagem de teste")));
    }
}
```

### 5.4 Teste do PedidoService com Mock do NotificacaoService

```java
@ExtendWith(MockitoExtension.class)
class PedidoServiceTest {
    
    @Mock
    private NotificacaoService notificacaoService;
    
    @InjectMocks
    private PedidoService pedidoService;
    
    @Test
    void deveProcessarPedidoEEnviarNotificacao() {
        // Arrange
        Pedido pedido = new Pedido(1L, 1L, "Produto teste");
        NotificacaoResponse mockResponse = new NotificacaoResponse(
            "SUCCESS", "Notificação enviada"
        );
        
        when(notificacaoService.enviarNotificacao(any(NotificacaoRequest.class)))
            .thenReturn(mockResponse);
        
        // Act
        pedidoService.processarPedido(pedido);
        
        // Assert
        verify(notificacaoService).enviarNotificacao(
            argThat(request -> 
                request.getClienteId().equals(pedido.getClienteId()) &&
                request.getMensagem().contains(pedido.getId().toString())
            )
        );
    }
}
```

## 6. Boas Práticas

1. **Nomenclatura dos Testes:**
   - Use nomes descritivos que indicam o cenário sendo testado
   - Siga o padrão: deve[Resultado]Quando[Cenário]

2. **Estrutura AAA (Arrange-Act-Assert):**
   - Arrange: prepare os dados e mockitos
   - Act: execute a ação a ser testada
   - Assert: verifique os resultados

3. **Isolamento:**
   - Cada teste deve ser independente
   - Use @BeforeEach para configuração comum
   - Evite dependências entre testes

4. **Cobertura:**
   - Teste casos de sucesso e falha
   - Inclua cenários de borda
   - Verifique exceções esperadas

## 6. Exemplos Completos

### 6.1 Testando Validações

```java
@Test
void deveLancarExcecaoQuandoEmailInvalido() {
    // Arrange
    Usuario usuario = new Usuario("João", "email-invalido");
    
    // Act & Assert
    assertThrows(IllegalArgumentException.class, 
        () -> usuarioService.criarUsuario(usuario));
}
```

### 6.2 Testando Listas

```java
@Test
void deveBuscarTodosUsuarios() {
    // Arrange
    List<Usuario> usuarios = Arrays.asList(
        new Usuario("João", "joao@email.com"),
        new Usuario("Maria", "maria@email.com")
    );
    when(usuarioRepository.findAll()).thenReturn(usuarios);
    
    // Act
    List<Usuario> resultado = usuarioService.buscarTodos();
    
    // Assert
    assertThat(resultado)
        .hasSize(2)
        .extracting(Usuario::getNome)
        .containsExactly("João", "Maria");
}
```

### 6.3 Testando Paginação

```java
@Test
void deveBuscarUsuariosPaginados() {
    // Arrange
    Page<Usuario> usuariosPaginados = new PageImpl<>(Arrays.asList(
        new Usuario("João", "joao@email.com"),
        new Usuario("Maria", "maria@email.com")
    ));
    Pageable pageable = PageRequest.of(0, 10);
    when(usuarioRepository.findAll(pageable)).thenReturn(usuariosPaginados);
    
    // Act
    Page<Usuario> resultado = usuarioService.buscarPaginado(pageable);
    
    // Assert
    assertThat(resultado.getContent()).hasSize(2);
    assertThat(resultado.getTotalElements()).isEqualTo(2);
}
```

## Conclusão

Este tutorial cobriu os principais aspectos de testes unitários em aplicações Spring Boot. Lembre-se de:

- Manter os testes simples e focados
- Usar mocks apropriadamente
- Testar tanto casos de sucesso quanto de falha
- Seguir as boas práticas de nomenclatura e organização
- Manter uma boa cobertura de testes

Para mais informações, consulte a documentação oficial do Spring Boot Testing e JUnit 5.
