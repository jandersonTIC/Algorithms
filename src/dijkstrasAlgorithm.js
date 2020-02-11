// Dijkstra's Algorithm is an algorithm for finding the shortest path between nodes in a graph
// Time Complexity: O(|V|^2)
const V = 9;
const MAX_INTEGER = 2147483647;

const minorDistance = (distantes, shortestPathTreeList) => {
    let minimum = MAX_INTEGER;
    let minIndex = -1;

    for (let v = 0; v < V; v++) {
        if (shortestPathTreeList[v] === false && distantes[v] < minimum) {
            minimum = distantes[v];
            minIndex = v;
        }
    }
    return minIndex;
}

const printSolution = distances => {
    console.log("Vertex \t\t Distance from Source");
    for (let i = 0; i < V; i++) {
        console.log(i, " \t\t ", distances[i]);
    }
}

const dijkstra = (graph, src) => {
    const distances = new Array(V).fill(MAX_INTEGER);
    const shortestPathTreeList = new Array(V).fill(false);
    // Distance of source vertex from itself is always 0
    distances[src] = 0;    

    for (let count = 0; count < V; count++) {
        const u = minorDistance(distances, shortestPathTreeList);
        shortestPathTreeList[u] = true;

        for (let v = 0; v < V; v++) {
            if (
                !shortestPathTreeList[v] &&
                graph[u][v] != 0 &&
                distances[u] != MAX_INTEGER &&
                distances[u] + graph[u][v] < distances[v]
            ) {
                distances[v] = distances[u] + graph[u][v];
            }
        }
    }
    printSolution(distances);
}

module.exports = dijkstra;