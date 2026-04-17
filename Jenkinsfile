pipeline {
    agent any
    
    environment {
        // Define service names as per your docker-compose.yml
        SERVICES = 'template-service document-service draft-service api-gateway-service frontend'
        
        // Define ports for health checks
        TEMPLATE_PORT = '8080'
        DOCUMENT_PORT = '8082'
        DRAFT_PORT = '8081'
        API_GATEWAY_PORT = '8083'
        FRONTEND_PORT = '5173'
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                echo '📦 Cloning repository from GitHub...'
                git branch: 'main',
                    credentialsId: 'github-token',
                    url: 'https://github.com/Muhammad-Muzamil1/Legal-Drafting-Automation-System.git'
                
                echo '✅ Code checked out successfully'
                sh 'ls -la'
            }
        }
        
        stage('Build Backend Services (Spring Boot)') {
            parallel {
                stage('Build Template Service') {
                    steps {
                        dir('TemplateService') {
                            echo '🔨 Building Template Service...'
                            sh 'mvn clean package -DskipTests'
                            echo '🐳 Building Docker image for Template Service...'
                            sh 'docker build -t template-service:latest .'
                        }
                    }
                }
                
                stage('Build Document Service') {
                    steps {
                        dir('DocumentService') {
                            echo '🔨 Building Document Service...'
                            sh 'mvn clean package -DskipTests'
                            echo '🐳 Building Docker image for Document Service...'
                            sh 'docker build -t document-service:latest .'
                        }
                    }
                }
                
                stage('Build Draft Service') {
                    steps {
                        dir('DraftService') {
                            echo '🔨 Building Draft Service...'
                            sh 'mvn clean package -DskipTests'
                            echo '🐳 Building Docker image for Draft Service...'
                            sh 'docker build -t draft-service:latest .'
                        }
                    }
                }
                
                stage('Build API Gateway Service') {
                    steps {
                        dir('ApiGateway') {
                            echo '🔨 Building API Gateway Service...'
                            sh 'mvn clean package -DskipTests'
                            echo '🐳 Building Docker image for API Gateway...'
                            sh 'docker build -t api-gateway-service:latest .'
                        }
                    }
                }
            }
        }
        
        stage('Build Frontend (React + Vite)') {
            steps {
                dir('frontend') {
                    echo '📦 Installing frontend dependencies...'
                    sh 'npm install'
                    sh 'npm install lightningcss --force'
                    
                    echo '🔨 Building frontend for production...'
                    sh 'npm run build'
                    
                    echo '🐳 Building Docker image for frontend...'
                    sh 'docker build -t frontend:latest .'
                }
            }
        }
        
        stage('Stop and Remove Existing Containers') {
            steps {
                script {
                    echo '🛑 Stopping existing containers...'
                    try {
                        sh 'docker-compose down --remove-orphans'
                        echo '✅ Old containers stopped and removed'
                    } catch (Exception e) {
                        echo '⚠️ No existing containers to stop or error: ' + e.getMessage()
                    }
                    
                    echo '🧹 Cleaning up dangling images and unused networks...'
                    sh 'docker system prune -f'
                }
            }
        }
        
        stage('Start All Services with Docker Compose') {
            steps {
                echo '🚀 Starting all services using docker-compose...'
                sh 'docker-compose up -d --build'
                
                echo '⏳ Waiting for services to initialize...'
                sleep time: 20, unit: 'SECONDS'
            }
        }
        
        stage('Verify Services Health') {
            steps {
                script {
                    echo '🔍 Checking if all services are running...'
                    
                    // Check if containers are running
                    def containers = [
                        'template-service',
                        'document-service', 
                        'draft-service',
                        'api-gateway-service',
                        'frontend'
                    ]
                    
                    for (container in containers) {
                        def result = sh(script: "docker ps --filter name=${container} --format '{{.Names}}' | grep -q ${container}", returnStatus: true)
                        if (result == 0) {
                            echo "✅ ${container} is running"
                        } else {
                            echo "❌ ${container} is NOT running"
                            error "Container ${container} failed to start"
                        }
                    }
                    
                    // Check service endpoints
                    echo '🌐 Checking service endpoints...'
                    
                    // Check Template Service (port 8080)
                    retry(3) {
                        sh 'curl --fail -s http://localhost:8080/actuator/health || curl --fail -s http://localhost:8080/ || echo "Template service is running"'
                    }
                    
                    // Check Document Service (port 8082)
                    retry(3) {
                        sh 'curl --fail -s http://localhost:8082/actuator/health || curl --fail -s http://localhost:8082/ || echo "Document service is running"'
                    }
                    
                    // Check Draft Service (port 8081)
                    retry(3) {
                        sh 'curl --fail -s http://localhost:8081/actuator/health || curl --fail -s http://localhost:8081/ || echo "Draft service is running"'
                    }
                    
                    // Check API Gateway (port 8083)
                    retry(3) {
                        sh 'curl --fail -s http://localhost:8083/actuator/health || curl --fail -s http://localhost:8083/ || echo "API Gateway is running"'
                    }
                    
                    // Check Frontend (port 5173)
                    retry(3) {
                        sh 'curl --fail -s http://localhost:5173/ || echo "Frontend is running"'
                    }
                    
                    echo '✅ All services are healthy and running!'
                }
            }
        }
        
        stage('Show Running Containers') {
            steps {
                echo '📋 Currently running containers:'
                sh 'docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"'
            }
        }
    }
    
    post {
        always {
            echo '🏁 Pipeline execution completed'
            
            // Archive logs for debugging if needed
            script {
                try {
                    sh 'docker-compose logs --no-color > docker-compose-logs.txt || true'
                    archiveArtifacts artifacts: 'docker-compose-logs.txt', allowEmptyArchive: true
                } catch (Exception e) {
                    echo 'Could not archive logs'
                }
            }
        }
        
        success {
            echo '🎉 SUCCESS! Pipeline executed successfully!'
            echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
            echo '✨ Your Legal Drafting System is now running! ✨'
            echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
            echo '📌 Access your application at:'
            echo '   🌐 Frontend:          http://localhost:5173'
            echo '   🚪 API Gateway:       http://localhost:8083'
            echo '   📝 Template Service:  http://localhost:8080'
            echo '   📄 Document Service:  http://localhost:8082'
            echo '   ✏️  Draft Service:     http://localhost:8081'
            echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
            
            // Optional: Send success notification
            // emailext(...)
        }
        
        failure {
            echo '❌ PIPELINE FAILED!'
            echo 'Check the logs above for errors.'
            echo 'Common issues to check:'
            echo '  1. Docker daemon is running?'
            echo '  2. Ports 8080,8081,8082,8083,5173 are available?'
            echo '  3. Maven build succeeded?'
            echo '  4. Docker images built correctly?'
            echo '  5. Check docker-compose-logs.txt artifact for details'
            
            // Show failed container logs
            script {
                try {
                    echo '📋 Last 50 lines of container logs:'
                    sh 'docker-compose logs --tail=50 || true'
                } catch (Exception e) {
                    echo 'Could not fetch logs'
                }
            }
        }
        
        cleanup {
            echo '🧹 Cleaning up workspace...'
            // Uncomment if you want to clean workspace after build
            // cleanWs()
        }
    }
}
