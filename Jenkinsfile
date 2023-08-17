pipeline {

    agent any;  

    tools{
        nodejs 'NODE_20.4.0'
    }

    stages {
        stage('Dependencias') {
            steps {
                echo "Instalando dependências"
                sh 'npm install'
            }
        }
        stage('Testes') {
            steps {
               // sh 'rm -rf %WORKSPACE%/test-report'
               // sh './node_modules/.bin/ng test --karma-config karma.conf.js --code-coverage'
                // junit './test-report/*Chrome_*/*.xml'                
            }
        }        
        stage('Sonar Analise') {
            environment{
                scannerHome = tool 'SONAR_SCANNER'
            }
            steps {
                withSonarQubeEnv('SONAR'){
                    sh "${scannerHome}/bin/sonar-scanner -e -Dsonar.projectKey=maxima-logistica-frontend  -Dsonar.sources=. -Dsonar.host.url=http://cloudtecnologia.dynns.com:9000 -Dsonar.login=8f03274dada6cdca207176d2f4889beca6b02a3a"
                }
            }
        }
        stage('Sonar QualityGate') {
            steps {
                sleep(20)
                timeout(time: 1, unit: 'MINUTES'){
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Build') {
            steps {
                echo "Instalando dependências"
                sh 'npm run build'
            }
        }
        stage('Imagem Docker') {
            steps {
                echo "Imagem Docker" 
                sh 'docker build -t maxima-logistica-frontend:lts .'           
            }
        }
        stage('Deploy'){
            steps {
               sh 'docker-compose build'
               sh 'docker-compose up -d'
            }
        }
        stage('Limpando Cache'){
           steps {
                sleep(10)
                sh 'docker system prune -f'
                sh 'docker ps'
           }
        } 
    }

   post{
        always {
            script {
                if (currentBuild.result == 'FAILURE') {
                    echo "Build Com erro(s)!"
                    emailext attachLog: true, body: 'LOG:', subject: "BUILD ${BUILD_NUMBER} maxima-logistica-frontend Executado com Erro(s)!", to: 'thi4go19+jenkins@gmail.com'
                } else {
                    echo "Build bem-sucedido!"
                    emailext attachLog: true, body: 'LOG:', subject: "BUILD ${BUILD_NUMBER} maxima-logistica-frontend Executado com Sucesso!", to: 'thi4go19+jenkins@gmail.com'
                }
            }
        }
   }

}