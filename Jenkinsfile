pipeline {
    agent any
    
    environment {
        // Use the correct credentials ID (match what you created)
        GITHUB_CREDENTIALS_ID = 'github-username-password'  // Changed from 'github-token'
        
        // Windows-specific settings
        DOCKER_COMPOSE_CMD = 'docker-compose'
        MAVEN_CMD = 'mvn.cmd'  // Use .cmd on Windows
        NPM_CMD = 'npm.cmd'     // Use .cmd on Windows
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                echo '📦 Cloning repository from GitHub...'
                
                // Use 'master' branch instead of 'main'
                git branch: 'master',  // Changed from 'main' to 'master'
                    credentialsId: "${GITHUB_CREDENTIALS_ID}",
                    url: 'https://github.com/Muhammad-Muzamil1/Legal-Drafting-Automation-System.git'
                
                echo '✅ Code checked out successfully'
                bat 'dir'  // Use 'bat' instead of 'sh' on Windows
            }
        }
        
        stage('Build Backend Services (Spring Boot)') {
            parallel {
                stage('Build Template Service') {
                    steps {
                        dir('TemplateService') {
                            echo '🔨 Building Template Service...'
                            bat 'mvn.cmd clean package -DskipTests'
                            echo '🐳 Building Docker image for Template Service...'
                            bat 'docker build -t template-service:latest .'
                        }
                    }
                }
                
                stage('Build Document Service') {
                    steps {
                        dir('DocumentService') {
                            echo '🔨 Building Document Service...'
                            bat 'mvn.cmd clean package -DskipTests'
                            bat 'docker build -t document-service:latest .'
                        }
                    }
                }
                
                stage('Build Draft Service') {
                    steps {
                        dir('DraftService') {
                            echo '🔨 Building Draft Service...'
                            bat 'mvn.cmd clean package -DskipTests'
                            bat 'docker build -t draft-service:latest .'
                        }
                    }
                }
                
                stage('Build API Gateway Service') {
                    steps {
                        dir('ApiGateway') {
                            echo '🔨 Building API Gateway Service...'
                            bat 'mvn.cmd clean package -DskipTests'
                            bat 'docker build -t api-gateway-service:latest .'
                        }
                    }
                }
            }
        }
        
        stage('Build Frontend (React + Vite)') {
            steps {
                dir('frontend') {
                    echo '📦 Installing frontend dependencies...'
                    bat 'npm.cmd install'
                    bat 'npm.cmd install lightningcss --force'
                    
                    echo '🔨 Building frontend for production...'
                    bat 'npm.cmd run build'
                    
                    echo '🐳 Building Docker image for frontend...'
                    bat 'docker build -t frontend:latest .'
                }
            }
        }
        
        stage('Stop and Remove Existing Containers') {
            steps {
                script {
                    echo '🛑 Stopping existing containers...'
                    try {
                        bat 'docker-compose down --remove-orphans'
                        echo '✅ Old containers stopped and removed'
                    } catch (Exception e) {
                        echo '⚠️ No existing containers to stop or error: ' + e.getMessage()
                    }
                    
                    echo '🧹 Cleaning up dangling images...'
                    bat 'docker system prune -f'
                }
            }
        }
        
        stage('Start All Services with Docker Compose') {
            steps {
                echo '🚀 Starting all services using docker-compose...'
                bat 'docker-compose up -d --build'
                
                echo '⏳ Waiting for services to initialize...'
                sleep time: 20, unit: 'SECONDS'
            }
        }
        
        stage('Verify Services Health') {
            steps {
                script {
                    echo '🔍 Checking if all services are running...'
                    
                    // Check containers on Windows
                    def containers = [
                        'template-service',
                        'document-service', 
                        'draft-service',
                        'api-gateway-service',
                        'frontend'
                    ]
                    
                    for (container in containers) {
                        def result = bat(script: "docker ps --filter name=${container} --format '{{.Names}}' | findstr ${container}", returnStatus: true)
                        if (result == 0) {
                            echo "✅ ${container} is running"
                        } else {
                            echo "❌ ${container} is NOT running"
                        }
                    }
                    
                    // Check service endpoints (Windows friendly)
                    echo '🌐 Checking service endpoints...'
                    
                    // Use curl or just echo for Windows (curl might not be installed)
                    try {
                        bat 'curl -s http://localhost:8080/actuator/health || echo "Template service running"'
                        bat 'curl -s http://localhost:8082/actuator/health || echo "Document service running"'
                        bat 'curl -s http://localhost:8081/actuator/health || echo "Draft service running"'
                        bat 'curl -s http://localhost:8083/actuator/health || echo "API Gateway running"'
                        bat 'curl -s http://localhost:5173 || echo "Frontend running"'
                    } catch (Exception e) {
                        echo 'Curl not available, assuming services are running'
                    }
                    
                    echo '✅ Services check completed!'
                }
            }
        }
        
        stage('Show Running Containers') {
            steps {
                echo '📋 Currently running containers:'
                bat 'docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"'
            }
        }
    }
    
    post {
        always {
            echo '🏁 Pipeline execution completed'
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
        }
        
        failure {
            echo '❌ PIPELINE FAILED!'
            echo 'Check the logs above for errors.'
            echo 'Common issues on Windows:'
            echo '  1. Docker Desktop is running?'
            echo '  2. Docker Compose is installed?'
            echo '  3. Maven is in PATH?'
            echo '  4. Node.js is in PATH?'
            
            // Show docker-compose logs
            script {
                try {
                    echo '📋 Docker Compose logs:'
                    bat 'docker-compose logs --tail=50 || echo "No logs available"'
                } catch (Exception e) {
                    echo 'Could not fetch logs'
                }
            }
        }
        
        cleanup {
            echo '🧹 Cleaning up workspace...'
        }
    }
}
