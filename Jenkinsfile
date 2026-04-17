pipeline {
    agent any

    environment {
        COMPOSE_FILE = "docker-compose.yml"
    }

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/Muhammad-Muzamil1/Legal-Drafting-Automation-System'
            }
        }

        stage('Build Backend Services') {
            steps {
                dir('ApiGateway') {
                    sh 'mvn clean package -DskipTests'
                }
                dir('TemplateService') {
                    sh 'mvn clean package -DskipTests'
                }
                dir('DocumentService') {
                    sh 'mvn clean package -DskipTests'
                }
                dir('DraftService') {
                    sh 'mvn clean package -DskipTests'
                }
		dir('Frontend'){
		    sh 'npm run build'
		}
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'docker compose down'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
