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

## 5. Boas Práticas

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
