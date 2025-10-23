export const pythonForAiMlData = {
  title: "Python for AI/ML Explained",
  description: "Python's dominance in AI comes from its simplicity and the power of its ecosystem. Let's dive into the core concepts and libraries that you'll use to manipulate data, perform numerical computations, and build models.",
  learningPoints: [
    {
      title: "Core Python Concepts: Functions & List Comprehensions",
      description: "Solid fundamentals are key. Functions allow you to organize code into reusable blocks, while list comprehensions provide a concise way to create lists, a common task in data preparation.",
      examples: [
        {
          description: "A function to preprocess a list of text data by converting to lowercase and removing whitespace.",
          code: `def preprocess_text(data):
    """Cleans a list of text strings."""
    return [text.lower().strip() for text in data]

# Example usage:
raw_data = ["  Hello World ", "PYTHON is Fun!  "]
cleaned_data = preprocess_text(raw_data)
# cleaned_data is now ['hello world', 'python is fun!']
print(cleaned_data)`
        }
      ]
    },
    {
      title: "NumPy: The Foundation for Numerical Computing",
      description: "NumPy (Numerical Python) is a library that provides support for large, multi-dimensional arrays and matrices, along with a collection of mathematical functions to operate on these arrays. It's the bedrock of almost every scientific Python library.",
      examples: [
        {
          description: "Creating a NumPy array and performing a vectorized operation. This is significantly faster than using a standard Python loop.",
          code: `import numpy as np

# Create a NumPy array from a list
embeddings = np.array([[0.1, 0.5, 0.3], [0.8, 0.2, 0.9]])

# Calculate the magnitude (L2 norm) of each embedding vector
magnitudes = np.linalg.norm(embeddings, axis=1)

# magnitudes is now array([0.59160798, 1.15325626])
print(magnitudes)`
        }
      ]
    },
    {
      title: "Pandas: Data Manipulation and Analysis",
      description: "Pandas is built on top of NumPy and is the go-to library for working with structured (tabular) data. Its primary data structure, the DataFrame, allows you to easily read, manipulate, and analyze data from various sources like CSVs or databases.",
      examples: [
        {
          description: "Creating a DataFrame from a dictionary and selecting specific columns and rows.",
          code: `import pandas as pd

# Create a DataFrame
data = {'user_id': [101, 102, 103], 'query': ['What is AI?', 'latest news', 'Python help'], 'clicks': [5, 12, 8]}
df = pd.DataFrame(data)

# Select queries with more than 10 clicks
high_performing_queries = df[df['clicks'] > 10]

# high_performing_queries is a new DataFrame with one row
#    user_id        query  clicks
# 1      102  latest news      12
print(high_performing_queries)`
        }
      ]
    },
    {
      title: "Matplotlib & Seaborn: Data Visualization",
      description: "Being able to visualize your data is crucial for understanding it. Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations. Seaborn is built on top of Matplotlib and provides a high-level interface for drawing attractive and informative statistical graphics.",
      examples: [
        {
          description: "A simple bar chart using Matplotlib to visualize the click data from our Pandas DataFrame.",
          code: `import matplotlib.pyplot as plt
import pandas as pd # Assuming df from previous example

# Create a simple bar chart
plt.figure(figsize=(8, 5))
plt.bar(df['query'], df['clicks'], color=['blue', 'green', 'orange'])
plt.xlabel("User Query")
plt.ylabel("Number of Clicks")
plt.title("Query Performance")
plt.xticks(rotation=15)
plt.show() # This will display the plot`
        }
      ]
    },
    {
      title: "Object-Oriented Programming (OOP) for AI Systems",
      description: "OOP helps in creating modular and reusable code by organizing it into 'objects' which can contain data and functions. In AI, you might create a class for a data loader, a model, or a text processor. This makes your system easier to manage and scale.",
      examples: [
        {
          description: "A simple RAG (Retrieval-Augmented Generation) pipeline represented as a class.",
          code: `class SimpleRAG:
    def __init__(self, vector_db, llm):
        self.vector_db = vector_db
        self.llm = llm

    def retrieve(self, query):
        # In a real app, this would query the vector_db
        print(f"Retrieving documents for: {query}")
        return ["Doc A: Python is a language.", "Doc B: AI is a field."]

    def generate_answer(self, query):
        context = self.retrieve(query)
        prompt = f"Context: {context}\\n\\nQuestion: {query}\\n\\nAnswer:"
        # In a real app, this would call the LLM API
        print(f"Generating answer with LLM.")
        return "Based on the context, Python is a programming language."

# Usage:
# rag_pipeline = SimpleRAG(my_db, my_llm)
# answer = rag_pipeline.generate_answer("What is Python?")
# print(answer)`
        }
      ]
    }
  ]
};