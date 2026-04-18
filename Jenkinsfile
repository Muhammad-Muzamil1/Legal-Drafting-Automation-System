pipeline {
    agent any

    tools {
        maven 'maven'
        nodejs 'node.js'
    }

    environment {
        MAVEN_OPTS = "-Dmaven.repo.local=${WORKSPACE}\\.m2"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo '📦 Cloning repository...'
                git branch: 'master',
                    url: 'https://github.com/Muhammad-Muzamil1/Legal-Drafting-Automation-System.git'
            }
        }

        stage('Build Backend Services') {
            steps {
                script {
                    def services = [
                        'TemplateService',
                        'DocumentService',
                        'DraftService',
                        'ApiGateway'
                    ]

                    for (service in services) {
                        dir(service) {
                            echo "🔨 Building ${service}..."
                            bat 'mvn clean package -DskipTests'
                        }
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('Frontend') {
                    echo '🎨 Building frontend...'
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo '🐳 Building Docker containers...'
                bat 'docker-compose build'
            }
        }

        stage('Run Containers') {
            steps {
                echo '🚀 Starting services...'
                bat 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            echo '🏁 Pipeline finished'
        }
        success {
            echo '✅ SUCCESS'
        }
        failure {
            echo '❌ FAILED'
        }
    }
}
