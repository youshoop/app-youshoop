<!DOCTYPE html>

<html lang="es">
    <head>
        <title>Plugin form Ready 0.1 beta</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        
        <script src="<?php echo base_url('public/js/formReady/jquery.min.js');?>"></script>   
        <script src="<?php echo base_url('public/js/formReady/jquery.formReady.js');?>"></script>   
        <script src="<?php echo base_url('public/js/formReady/jAplication.js');?>"></script>   
        <link href="<?php echo base_url('public/css/formReady/formReady.css');?>" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url('public/css/formReady/styles.css');?>" rel="stylesheet" type="text/css">
        <script>
            $(function(e) {
                var rules = [
                    ['#txtNombre', 'required;name'],
                    ['#txtEmail', 'required;email'],
                    ['#txtMensaje', 'maxlength(65);required']
                ];

                $('#frmContacto').formReady(rules);

                var rules2 = [
                    ['#txtNombre2', 'required;name'],
                    ['#txtEmail2', 'required;email'],
                    ['#txtMensaje2', 'maxlength(65);required']
                ];

                $('#frmContacto2').formReady(rules2, 'blur');

                var rules3 = [
                    ['#txtNombre3', 'required;name'],
                    ['#txtEmail3', 'required;email'],
                    ['#txtMensaje3', 'maxlength(65);required']
                ];

                $('#frmContacto3').formReady(rules3, 'keyup');

            });
        </script>
    </head>
    <body>
<!--         <div id="cont">
    <ul>
        <li>Ajax</li>
        <li>Plantillas</li>
        <li>Script</li>
    </ul>
</div> -->
        <header>                
            <nav id="mnu">
                <ul>
                    <li>
                        <a id="mnu1" href="#inicio">Inicio</a>
                    </li>
                    <li>
                        <a id="mnu2"  href="#cabeceraHtml">Cabecera Html</a>
                    </li>
                    <li>
                        <a id="mnu3" href="#formularioHtml">Formulario Html</a>
                    </li>
                    <li >
                        <a id="mnu4" href="#NuestroJavaScript">Nuestro JavaScript</a>
                    </li>
                    <li>
                        <a id="mnu5" href="#EventoBlur">Evento Blur</a>
                    </li>
                    <li>
                        <a id="mnu6" href="#eventoKeyup">Evento Keyup</a>
                    </li>
                </ul>
            </nav>
        </header>
        <section  id="inicio">
            <blockquote>
                <div >
                    <h1>jQuery formReady  Plugin - Validación de Formularios</h1>

                </div>
                <div >        
                    <p>formReady nació de la necesidad de tener un plugin fácil de incorporar a nuestros proyectos
                        para las validaciones más importantes en los formularios. En su version 0.1 cuenta con 18 validaciones,
                        por defecto formReady tiene asociado la acción submit del formulario, pero si queremos podemos asociar eventos de tipo
                        blur o keyup, que pueden ser definidos de una manera sencilla por el desarrollador, al igual
                        que las reglas que tendra cada formulario.<br>
                        El estilo de formReady  pueden ser modificado para adaptarse al diseño de cada página permitiendo una integración total
                        con nuestro proyecto.
                    </p>
                    <div><a class="desc" href="https://github.com/yonaxTics/FormReady">Descargar Form Ready</a></div>
                </div>
            </blockquote>
        </section>
        <section  id="cabeceraHtml">
            <blockquote>
                <div>
                    <h2>Nuestra Cabecera de HTML</h2>
                    <p>
                        En la cabecera de nuestra pagina debemos referenciar la hoja de estilos (css) que viene por defecto en el paquete,
                        junto con el javaScript, además tener la ultima versión de jquery que puedes descargar de <a href="http://jquery.com/" target="_blank">aquí.</a>
                    </p>
                    <pre>
                   <code>
  &lt;!DOCTYPE html&gt;
 &lt;html&gt;
     &lt;head&gt;
         &lt;title&gt;Plugin form Ready &lt;/title&gt;
         &lt;meta http-equiv="Content-Type" content="text/html; charset=UTF-8"&gt;
         &lt;script type="text/javascript" src="js/jquery.min.js"&gt; &lt;/script&gt;
         &lt;script type="text/javascript" src="js/jquery.formReady.js"&gt; &lt;/script&gt;
         &lt;link rel="stylesheet" type="text/css" media="screen" href="css/formReady.css" /&gt;
     &lt;/head&gt;
                   </code>
                    </pre>
                </div>
            </blockquote>
        </section>
        <section  id="formularioHtml">
            <blockquote>
                <div>
                    <h2>Nuestro formulario HTML</h2>
                    <p>
                        formReady se integra de una manera sencilla con nuestros formularios, solo necesitamos tener un Id por formularios (form) y por cada
                        campo (input) dentro del formulario, para más adelante poder acceder a ellos y definir sus propias reglas.
                    </p>
                    <pre>
                   <code>
              &lt;form id="frmContacto" action="index.html"&gt;
                 &lt;ul&gt;                   
                     &lt;li&gt;
                         &lt;label for="txtNombre"&gt;Nombre : &lt;/label&gt;
                         &lt;input type="text" name="txtNombre" id="txtNombre" placeholder="nombre y apellido" /&gt;
                     &lt;/li&gt;
                     &lt;li&gt;
                         &lt;label for="txtEmail"&gt;E-Mail : &lt;/label&gt;
                         &lt;input type="text" name="txtEmail" id="txtEmail" placeholder="ejemplo@correo.com" /&gt;
                     &lt;/li&gt;
                     &lt;li&gt;
                         &lt;label for="txtMensaje"&gt;E-Mail : &lt;/label&gt;
                         &lt;textarea name="txtMensaje" id="txtMensaje" placeholder="por favor, sea breve"&gt; &lt;/textarea&gt; 
                     &lt;/li&gt;
                     &lt;li&gt;
                         &lt;input type="submit" name="btnSubmit" id="btnSubmit" value="Enviar"/&gt;
                     &lt;/li&gt;
                 &lt;/ul&gt;
             &lt;/form&gt;
                   </code>
                    </pre>
                </div>
            </blockquote>   
        </section>
        <section  id="NuestroJavaScript">
            <blockquote>
                <div>
                    <h2>Nuestro JavaScript</h2>
                    <p>
                        Solamente tenemos que llamar a nuestro plugin por medio del Id del formulario (form), pero antes debemos definir una matriz con
                        nuestras reglas para el formulario, donde en cada fila tenemos dos columnas, la columna (0) represena el id del campo(input) y la 
                        columna(1) representa las reglas de dicho campo (input), cada regla debe de ir separada por un punto y coma (;) y sin espacios entre ellas,
                        hay algunos casos particulares que necesitaremos definir un parametro que irá entre parentisis como por ejemplo, para  determinar la cantidad de caracteres que admita
                        dicho campo (input). Suena un poco complicado, pero es mas fácil de lo que podemos imaginar.
                    </p>
                    <pre>
                  <code>
     &lt;script&gt;
            $(function(e) {                
                var rules = [
                    ['#txtNombre','required;name'],
                    ['#txtEmail','required;email'],
                    ['#txtMensaje','maxlength(65);required']
                ];                
                $('#frmContacto').formReady(rules);
            });
    &lt;/script&gt;   
                  </code>
                    </pre>
                </div>

                <div>
                    <h2>Demo</h2>                
                    <form id="frmContacto" action="index.html">
                        <ul>                   
                            <li>
                                <label for="txtNombre">Nombre :</label><br>
                                <input type="text" name="txtNombre" id="txtNombre" placeholder="nombre y apellido" />
                            </li>
                            <li>
                                <label for="txtEmail">E-Mail :</label><br>
                                <input type="text" name="txtEmail" id="txtEmail" placeholder="ejemplo@correo.com" />
                            </li>
                            <li>
                                <label for="txtMensaje">Mensaje :</label><br>
                                <textarea name="txtMensaje" id="txtMensaje" placeholder="por favor, sea breve"></textarea> 
                            </li>
                            <li>
                                <input type="submit" name="btnSubmit" id="btnSubmit" value="Enviar"/>
                            </li>
                        </ul>
                    </form>
                </div>
            </blockquote>
        </section>
        <section id="EventoBlur">
            <blockquote>
                <div >
                    <h2>Validar con el evento blur. </h2>
                    <p>
                        formReady nos da la posibilidad de manejar el evento blur(peder el foco del campo), solo si nosotros lo queremos y lo único
                        que debemos hacer es mandar como segundo parametro el nombre del evento.
                    </p>
                    <pre>
                    <code>
  &lt;script&gt;
            $(function(e) {                
                var rules = [
                    ['#txtNombre','required;name'],
                    ['#txtEmail','required;email'],
                    ['#txtMensaje','maxlength(65);required']
                ];                
                $('#frmContacto').formReady(rules,'blur');
            });
    &lt;/script&gt;   
                    </code>
                    </pre>
                </div> 
                <div>
                    <h2>Demo con el evento blur</h2>                
                    <form id="frmContacto2" action="index.html">
                        <ul>                   
                            <li>
                                <label for="txtNombre">Nombre :</label><br>
                                <input type="text" name="txtNombre" id="txtNombre2" placeholder="nombre y apellido" />
                            </li>
                            <li>
                                <label for="txtEmail">E-Mail :</label><br>
                                <input type="text" name="txtEmail" id="txtEmail2" placeholder="ejemplo@correo.com" />
                            </li>
                            <li>
                                <label for="txtMensaje">Mensaje :</label><br>
                                <textarea name="txtMensaje" id="txtMensaje2" placeholder="por favor, sea breve"></textarea> 
                            </li>
                            <li>
                                <input type="submit" name="btnSubmit" id="btnSubmit2" value="Enviar"/>
                            </li>
                        </ul>
                    </form>
                </div>
            </blockquote>
        </section>
        <section  id="eventoKeyup">
            <blockquote>
                <div>
                    <h2>Validar con el evento keyup. </h2>
                    <p>
                        formReady nos da la posibilidad de manejar el evento keyup(al presionar una tecla), solo si nosotros lo queremos y lo único
                        que debemos hacer es mandar como segundo parametro el nombre del evento.
                    </p>
                    <pre>
                    <code>
  &lt;script&gt;
            $(function(e) {                
                var rules = [
                    ['#txtNombre','required;name'],
                    ['#txtEmail','required;email'],
                    ['#txtMensaje','maxlength(65);required']
                ];                
                $('#frmContacto').formReady(rules,'keyup');
            });
    &lt;/script&gt;   
                    </code>
                    </pre>
                </div> <div>
                    <h2>Demo con el evento keyup</h2>                
                    <form id="frmContacto3" action="index.html">
                        <ul>                   
                            <li>
                                <label for="txtNombre">Nombre :</label><br>
                                <input type="text" name="txtNombre" id="txtNombre3" placeholder="nombre y apellido" />
                            </li>
                            <li>
                                <label for="txtEmail">E-Mail :</label><br>
                                <input type="text" name="txtEmail" id="txtEmail3" placeholder="ejemplo@correo.com" />
                            </li>
                            <li>
                                <label for="txtMensaje">Mensaje :</label><br>
                                <textarea name="txtMensaje" id="txtMensaje3" placeholder="por favor, sea breve"></textarea> 
                            </li>
                            <li>
                                <input type="submit" name="btnSubmit" id="btnSubmit3" value="Enviar"/>
                            </li>
                        </ul>
                    </form>
                </div>
            </blockquote>
        </section>
        <footer>
            © Copyright 2014 Form Ready by Yonatan Alexis Quintero Rodriguez | Version  0.1 beta
        </footer>
    </body>
</html>
