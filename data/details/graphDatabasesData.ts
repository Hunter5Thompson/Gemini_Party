export const graphDatabasesData = {
  title: "Graph Databases for RAG Explained",
  description: "While vector databases find semantically similar text, graph databases excel at retrieving information based on explicit relationships between entities. They add a powerful, structured dimension to your retrieval system, allowing you to answer questions that vector search alone cannot.",
  learningPoints: [
    {
      title: "What is a Graph Database?",
      description: "A graph database stores data as nodes (entities) and edges (relationships). Instead of searching for text, you traverse the graph, following connections between data points. This is ideal for highly connected data like social networks, supply chains, or knowledge graphs.",
      examples: [
        {
          description: "A simple graph might have nodes like 'Person' and 'Project' with an edge like 'WORKED_ON'.",
          code: `// Conceptual representation of a graph
(Person {name: 'Alice'})-[:WORKED_ON]->(Project {name: 'Gemini RAG'})
(Person {name: 'Bob'})-[:WORKED_ON]->(Project {name: 'Gemini RAG'})
(Person {name: 'Alice'})-[:KNOWS]->(Person {name: 'Bob'})`
        }
      ]
    },
    {
      title: "Graph RAG vs. Vector RAG",
      description: "Use Vector RAG for 'fuzzy' semantic questions ('Tell me about AI safety'). Use Graph RAG for precise, multi-hop questions that rely on relationships ('Which colleagues of Alice also worked on the Gemini RAG project?'). To answer this, you first find 'Alice', traverse the 'WORKED_ON' edge to the project, then traverse backwards along all 'WORKED_ON' edges to find other people, like 'Bob'.",
      examples: []
    },
    {
      title: "Combining Graph and Vector Search",
      description: "The most powerful systems often combine both. For instance, you could use vector search to identify the main entities in a user's query (e.g., find the 'Gemini RAG' node) and then use the graph database to explore the relationships around that entity to find a precise answer.",
      examples: [
        {
          description: "A conceptual query in Cypher (a common graph query language).",
          code: `// User asks: "Who worked with Alice?"
// 1. Find Alice
MATCH (p:Person {name: 'Alice'})
// 2. Find people she knows
MATCH (p)-[:KNOWS]-(colleague:Person)
// 3. Return their names
RETURN colleague.name`
        }
      ]
    }
  ]
};
