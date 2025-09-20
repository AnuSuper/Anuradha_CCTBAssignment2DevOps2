pipeline {
    agent any
    environment {
        TEST_RESULT_FILE = 'test_result.txt'
        REPO_URL = 'https://github.com/AnuSuper/Anuradha_CCTBAssignment2DevOps2'
        TESTING_SERVER = '18.234.63.89'
        PRODUCTION_SERVER = '3.91.255.196'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building Website...'
                // No npm install needed
            }
        }

        stage('Deploy to Testing') {
            steps {
                echo 'Deploying to Testing Server...'
                // Already deployed manually
                // sh """
                // ssh ec2-user@$TESTING_SERVER "sudo rm -rf /var/www/html/*"
                // ssh ec2-user@$TESTING_SERVER "git clone $REPO_URL /var/www/html"
                // """
            }
        }

        stage('Run Selenium Tests') {
            steps {
                echo 'Running Selenium Tests...'
                script {
                    try {
                        sh 'node selenium-tests/test_form.js'
                        writeFile(file: env.TEST_RESULT_FILE, text: 'true')
                    } catch (Exception e) {
                        writeFile(file: env.TEST_RESULT_FILE, text: 'false')
                    }
                }
            }
        }

        stage('Deploy to Production') {
            when {
                expression {
                    def result = readFile(env.TEST_RESULT_FILE).trim()
                    return result == 'true'
                }
            }
            steps {
                echo 'Deploying to Production Server...'
                sh """
                ssh ec2-user@$PRODUCTION_SERVER "sudo rm -rf /var/www/html/*"
                ssh ec2-user@$PRODUCTION_SERVER "git clone $REPO_URL /var/www/html"
                """
            }
        }
    }
}
