
# MicroMart - Kubernetes Microservices Project

This project deploys a microservices-based e-commerce application called **MicroMart** using Kubernetes. The project includes multiple services (User Service, Product Service) with a PostgreSQL database for storing product data and user information. The project is deployed using Docker containers and managed with Kubernetes. It also includes a frontend built with React and served via Nginx, and an Ingress controller for routing.

## Project Structure

- **Frontend (React)**: The React-based user interface of the application.
- **User Service (Node.js)**: A service for managing user data (profile).
- **Product Service (Node.js)**: A service for managing product data (listing, details, etc.).
- **PostgreSQL**: A relational database service for storing product and user data.

## Features

- **Microservices Architecture**: Each service is independently deployed and managed.
- **Frontend**: Built with React and served by Nginx.
- **Kubernetes Deployments**: All services are deployed and managed with Kubernetes.
- **Ingress Controller**: Routes traffic to the appropriate service (frontend, user, product).

## Prerequisites

Ensure the following tools are installed on your local machine:

- **Docker**: For building container images.
- **Kubernetes**: For deploying and managing the application.
- **kubectl**: For interacting with Kubernetes clusters.
- **Node.js and NPM**: For building and running the React frontend and Node.js services.

##  Architecture flowchart:
                              ┌──────────────────────────────┐
                             │         User (Browser)       │
                             └──────────────┬───────────────┘
                                            │
                                            ▼
                           ┌────────────────────────────────────┐
                           │         Ingress Controller         │
                           │        (NGINX - Handles Routing)   │
                           └────────────┬────────────┬──────────┘
                                        │            │
                                        ▼            ▼
                         ┌────────────────────┐ ┌──────────────────────┐
                         │  Frontend (React)  │ │     Backend API      │
                         │ frontend-service   │ │  (Ingress Paths to   │
                         └──────────┬─────────┘ │  user & product svc) │
                                    │           └──────────┬───────────┘
                                    ▼                      ▼
                   ┌──────────────────────────┐  ┌──────────────────────────┐
                   │  User Service (Node.js)  │  │ Product Service (Node.js)│
                   │     user-service         │  │   product-service        │
                   └────────────┬─────────────┘  └────────────┬─────────────┘
                                │                             │
                                ▼                             ▼
                     ┌──────────────────────┐     ┌────────────────────────┐
                     │ PostgreSQL Database  │     │ PostgreSQL Database     │
                     │     (AWS RDS)        │     │     (AWS RDS)           │
                     └──────────────────────┘     └────────────────────────┘


## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/micromart-kubernetes
cd micromart-kubernetes
```

### 2. Build Docker Images

Navigate to the `frontend`, `user-service`, and `product-service` directories and build Docker images.

```bash
docker build -t your-dockerhub-username/micromart-frontend:latest ./frontend
docker build -t your-dockerhub-username/micromart-user-service:latest ./user-service
docker build -t your-dockerhub-username/micromart-product-service:latest ./product-service
```

### 3. Push Docker Images to a Container Registry

```bash
docker push your-dockerhub-username/micromart-frontend:latest
docker push your-dockerhub-username/micromart-user-service:latest
docker push your-dockerhub-username/micromart-product-service:latest
```

### 4. Kubernetes Setup

Make sure you have a Kubernetes cluster set up and configured. You can use **Minikube** for local clusters or **AWS EKS** for cloud-based clusters.

### 5. Apply Kubernetes Configurations

In the root of the project, apply the Kubernetes configurations:

```bash
kubectl apply -f k8s/
```

This will deploy all services and configurations including deployments, services and ingress.

### 6. Access the Application

- If you are using **Minikube** with a local Kubernetes setup, you can access the application by running:

  ```bash
  minikube service frontend-service --url
  ```

  This will provide you with the URL to access the frontend.

- For a cloud-based setup like **AWS EKS**, you will need to configure an Ingress Controller (e.g., Nginx Ingress) and set up DNS to point to your load balancer.

### 7. Debugging

- Check pod status and logs:

  ```bash
  kubectl get pods
  kubectl logs <pod-name>
  ```

- Check Ingress routes:

  ```bash
  kubectl describe ingress micromart-ingress
  ```

### 8. Cleanup

To delete the Kubernetes resources:

```bash
kubectl delete -f k8s/
```
## Picture:
  ![Screenshot_10](https://github.com/user-attachments/assets/25a8aab3-c783-4526-83b0-cfe10d8fda26)

## Notes

- Ensure that PostgreSQL is properly configured with the required environment variables (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`).
- For production environments, consider using a managed database like AWS RDS instead of hosting PostgreSQL inside the Kubernetes cluster.
- You can extend the project with more services, like an order service, payment service, etc.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
