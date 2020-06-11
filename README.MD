## Projeto RevELA - Cuidadores na Assistência ao Paciente – Cuidados respiratórios na ELA 

Repositório [https://github.com/elionaimelo/projetoRevELAv1](https://github.com/elionaimelo/projetoRevELAv1).

![Image do recurso](src/images/recurso-markdown.png)


É preciso instalar algumas depedências(caso não tenha instalado)

node [https://nodejs.org/download](https://nodejs.org/download/).

gulp [https://gulpjs.com/](https://gulpjs.com/)

Para instalar o gulp, execute o seguinte comando:
```
npm install --global gulp-cli
```

depois execute o comando para instalar todas as outras dependências do projeto
```
npm i
```

#### Informações úteis

Todos os scripts serão concatenados e minificados, portanto, é importante saber das informações abaixo

* Para inserir arquivos baixados com o gerenciador de pacotes acesse o **gulpfile.js** e a função **copyAssets**

* Para ordernar o script acesse o **gulpfile.js** e procure pela função **javascript**

#### Alguns comandos para o projeto

+  `gulp` - recompila e minifica tudo e coloca dentro do diretório `dist`. Além de iniciar uma servidor local com browserupdate

+  `gulp build` - recompila e minifica tudo e coloca dentro do diretório `dist`

