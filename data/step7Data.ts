export const step7Data = {
  "CI/CD": {
    title: "CI/CD for AI Systems",
    description: "Continuous Integration/Continuous Deployment (CI/CD) automates the build, test, and deployment pipeline. For AI systems, this goes beyond typical software testing to include model evaluation, data validation, and prompt testing, ensuring that changes improve, rather than degrade, system performance.",
    learningPoints: [
      {
        title: "What is CI/CD?",
        description: "CI (Continuous Integration) is the practice of frequently merging code changes into a central repository, after which automated builds and tests are run. CD (Continuous Deployment) is the practice of automatically deploying all code changes that pass the CI stage to a production environment. This creates a fast and reliable release cycle.",
        examples: []
      },
      {
        title: "A CI/CD Pipeline for a RAG Application",
        description: "An AI-specific CI/CD pipeline includes unique steps. Alongside standard code linting and unit tests, you need to run an evaluation suite against your RAG pipeline or agent to check for regressions in quality.",
        examples: [
          {
            description: "A conceptual GitHub Actions workflow. This automates testing, evaluation, and deployment.",
            code: `name: AI App CI/CD

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'

    - name: Install dependencies
      run: pip install -r requirements.txt

    - name: Run Unit Tests
      run: pytest tests/unit

    - name: Run AI Evaluations
      # This step runs a script that tests the RAG pipeline against a golden dataset
      run: python -m scripts.run_evals --dataset ./evals/dataset.json

    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: my-registry/my-ai-app:latest`
          }
        ]
      }
    ]
  },
  "Containerization": {
    title: "Containerization (Docker)",
    description: "Containerization packages an application and all its dependencies into a single, isolated unit called a container. Docker is the industry standard for this. It ensures that your AI application runs identically and reliably, regardless of the environment—be it a developer's laptop or a production server.",
    learningPoints: [
      {
        title: "Why Use Containers?",
        description: "Containers solve the 'it works on my machine' problem. By bundling the code, Python version, system libraries, and dependencies together, you create a portable artifact that is easy to deploy, scale, and manage.",
        examples: []
      },
      {
        title: "Creating a Dockerfile for an AI App",
        description: "A `Dockerfile` is a text file that contains the instructions for building a Docker image. It specifies the base image, copies your application code, installs dependencies, and defines the command to run when the container starts.",
        examples: [
          {
            description: "A simple Dockerfile for a Python FastAPI application.",
            code: `# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application's code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`
          }
        ]
      }
    ]
  },
  "Kubernetes": {
    title: "Kubernetes for AI",
    description: "Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. For AI/ML workloads, it provides the scalability and resilience needed to serve models in production reliably.",
    learningPoints: [
      {
        title: "Core Concepts: Pods, Deployments, and Services",
        description: "A 'Pod' is the smallest deployable unit in Kubernetes and can contain one or more containers. A 'Deployment' manages a set of replica Pods, ensuring that a specified number are always running and handling automated rollouts. A 'Service' provides a stable network endpoint (like an IP address) to access the Pods in a Deployment.",
        examples: []
      },
      {
        title: "Deploying an AI App on Kubernetes",
        description: "You define your desired state using YAML configuration files. This example shows a Deployment to run 3 replicas of our AI app's container and a Service to expose it to the internet.",
        examples: [
          {
            description: "A simplified Kubernetes manifest (`deployment.yaml`).",
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-app-deployment
spec:
  replicas: 3 # Run 3 instances of our app for high availability
  selector:
    matchLabels:
      app: ai-app
  template:
    metadata:
      labels:
        app: ai-app
    spec:
      containers:
      - name: ai-app-container
        image: my-registry/my-ai-app:latest # The Docker image we built
        ports:
        - containerPort: 8000
---
apiVersion: v1
kind: Service
metadata:
  name: ai-app-service
spec:
  type: LoadBalancer # Exposes the service externally
  selector:
    app: ai-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8000`
          }
        ]
      }
    ]
  },
  "Cloud Services": {
    title: "Cloud Services (AWS, GCP, Azure)",
    description: "Major cloud providers offer a vast suite of services that are essential for building and deploying AI applications. These services provide scalable infrastructure for data storage, computation, model training, and deployment, so you don't have to build it all yourself.",
    learningPoints: [
      {
        title: "Key Service Categories",
        description: "1. **Storage:** Services like Amazon S3, Google Cloud Storage (GCS), and Azure Blob Storage are used to store datasets, documents for RAG, and model artifacts. 2. **Compute:** Virtual machines (EC2, Compute Engine) for general tasks, and specialized GPU instances for training and inference. 3. **Managed AI/ML Platforms:** Services like AWS SageMaker, Google Vertex AI, and Azure Machine Learning provide end-to-end MLOps capabilities, from data labeling to model hosting.",
        examples: []
      },
      {
        title: "Interacting with Cloud Services via SDKs",
        description: "You typically interact with cloud services programmatically using their Software Development Kits (SDKs). This allows your application to do things like fetch documents from a storage bucket to use in a RAG pipeline.",
        examples: [
          {
            description: "A Python example using AWS's `boto3` SDK to list files in an S3 bucket.",
            code: `import boto3

# Initialize the S3 client
s3 = boto3.client('s3')

# The name of the bucket containing your knowledge base
bucket_name = 'my-rag-knowledge-base'

# List the first 10 objects in the bucket
response = s3.list_objects_v2(Bucket=bucket_name, MaxKeys=10)

for obj in response.get('Contents', []):
    print(f"Found document: {obj['Key']}")`
          }
        ]
      }
    ]
  },
  "LLM deployment": {
    title: "LLM Deployment Strategies",
    description: "Deploying and serving LLMs efficiently is a significant engineering challenge due to their large size and high computational requirements. Specialized strategies and tools are needed to achieve low latency and high throughput in production.",
    learningPoints: [
      {
        title: "Model Quantization",
        description: "Quantization is the process of reducing the precision of the model's weights, typically from 16-bit floating-point (FP16) to 8-bit integers (INT8) or even 4-bit. This can dramatically reduce the model's memory footprint (VRAM usage) and increase inference speed, often with only a small impact on accuracy.",
        examples: []
      },
      {
        title: "Optimized Inference Servers",
        description: "Standard web servers are not equipped to handle LLM inference. Specialized servers like vLLM or Text Generation Inference (TGI) are designed for this. They implement advanced techniques like PagedAttention and continuous batching to maximize GPU utilization and serve many concurrent requests efficiently.",
        examples: [
          {
            description: "Using a client to connect to an optimized inference server. The server handles all the complexity of running the model efficiently.",
            code: `import requests

# The endpoint of your deployed TGI or vLLM server
INFERENCE_SERVER_URL = "http://localhost:8080/generate"

# The client sends a simple request
response = requests.post(INFERENCE_SERVER_URL, json={
  "inputs": "What is Kubernetes?",
  "parameters": {
    "max_new_tokens": 256
  }
})

# The server returns the generated text
generated_text = response.json()["generated_text"]
print(generated_text)`
          }
        ]
      }
    ]
  },
  "Model Routing": {
    title: "Model Routing",
    description: "A model router, or gateway, is a service that intelligently directs an incoming request to the most appropriate LLM from a pool of available models. This allows you to optimize for cost, latency, and performance by using the right tool for the right job.",
    learningPoints: [
      {
        title: "Why Use a Router?",
        description: "Not all tasks require your most powerful (and expensive) model. A simple classification task can be handled by a cheap, fast model, while a complex reasoning task might need a state-of-the-art model. A router makes this decision automatically.",
        examples: []
      },
      {
        title: "Implementing a Simple Router",
        description: "The logic for a router can be simple rule-based logic or even another LLM call. This example shows a rule-based router that selects a model based on the complexity of the user's query.",
        examples: [
          {
            description: "A conceptual Python function for a model router.",
            code: `def route_request(prompt):
    """Selects the best model for a given prompt."""

    # Simple task detection
    simple_keywords = ["classify", "translate", "summarize in 5 words"]
    if any(keyword in prompt.lower() for keyword in simple_keywords):
        print("Routing to: gemini-2.5-flash (fast & cheap)")
        return "gemini-2.5-flash"

    # Complex task detection
    complex_keywords = ["code", "reason step-by-step", "analyze the following"]
    if any(keyword in prompt.lower() for keyword in complex_keywords):
        print("Routing to: gemini-2.5-pro (powerful & smart)")
        return "gemini-2.5-pro"

    # Default model for general chat
    print("Routing to: gemini-2.5-flash (default)")
    return "gemini-2.5-flash"

# Example usage:
# model_to_use = route_request("Please write python code to call an API.")
# -> Routing to: gemini-2.5-pro (powerful & smart)`
          }
        ]
      }
    ]
  }
};