Esta va a ser una charla sobre javascript.

[JS logo]

Puede resultar absurda la aclaracion, pero cuando uno busca informacion sobre algunas de las cosas que voy a mostrar,
termina en general leyendo sobre matematica.

Y por que terminamos leyendo sobre matematica? Porque ademas de javascript, esta charla es sobre programacion funcional.

[Lambda Logo]

Hace unos meses estaba viendo una charla de la JSConf EU sobre programacion funcional por Stefanie Schrimer (https://www.youtube.com/watch?v=6Qx5ZAbfqjo),
y en un momento, tras hablar brevemente de monadas, dice "Let's write a function that behaves like the semicolon, can we do that?".

[wat]

Fue una de esas preguntas que te toman por sorpresa. Casi mas una cuestion filosofica que informatica.

Eso derivo en multiples intentos fallidos de intentar entender a que se referia. El problema para mi fue que despues de dos o tres clicks terminaba con esto...

[wikipedia complicado]

Eventualmente, como al quinto intento, de a poco empezo a tener sentido. Y cuando finalmente lo hizo, me di cuenta que estaba ante algo mas grande, y que mas alla de satisfacer la curiosidad de entender a que se habia referido Stefanie, lo que habia era una herramienta que venia usando por años sin siquiera saberlo.

(La idea de la charla es ahorrarles la frustracion, y hacer una introduccion practica a ciertos conceptos de programacion funcional con javascript.

Para empezar, quiero que veamos...)

Para demostrarlo, quiero que veamos tres ejemplos de codigo:

{Que pueden decir al respecto? Por que son distintas? Que palabras pueden asociar con una clase de solucion, versus la otra? Alguna es "mejor"? Por que?}

Entonces, ahora si: Programacion functional.

Antes que nada, tenemos que hablar de funciones. Como todos sabemos, en Javascript una funcion es un bloque de codigo que podemos ejecutar cuando querramos, que recibe 0 o mas argumentos, y devuelve un valor. Esto es valido siempre, ya que aun si la funcion no tiene ningun `return`, va a devolver `undefined`, que es un valor.

Gracias a que en Javascript las funciones son ciudadanos de primera clase, nuestras funciones pueden recibir argumentos como funciones, y devolver funciones. Es decir, pueden ser funciones de orden superior.

Encima de la definicion de funcion que nos da Javascript, voy a agregar un requerimiento mas:

* Nuestras funciones van a recibir siempre 1 y solo 1 argumento.

Antes de ver el por que, veamos el como.

{Alguien sabe de que estoy hablando?}

Currying

[Currying]

{Quien de aca sabe lo que es currying?}

En lo que nos importa a nosotros como programadores, currying es una tecnica para transformar una funcion de n argumentos en n funciones de 1 argumento cada una.

Veamoslo con un ejemplo.

[Code: Curry]

Algo bueno de Javascript es que generalmente podemos simplemente "escribir lo que queremos" y el codigo sale.

En este caso, queremos transformar una funcion de 4 argumentos en una funcion que recibe un argumento y devuelve otra funcion...
que recibe un argumento y devuelve otra funcion... que recibe un argumento y devuelve otra funcion... que finalmente devuelve el calculo con los 4 valores a la vez.

Por suerte tenemos ES6 y las arrow functions, que nos permiten escribir lo mismo de forma mucho mas directa:

[Code: Curry]

Como se ve, transformamos una funcion de 4 argumentos en 4 funciones de 1 argumento: Las primeras tres funciones devuelven una funcion, y la ultima devuelve el resultado.

Notar que siempre pudimos reutilizar la funcion original. Esto nos da la idea de que deberia ser posible escribir una funcion de orden superior que reciba una funcion de n argumentos y nos devuelva la funcion curry-eada.

En efecto, escribir esa funcion en Javascript no es muy dificil, pero en la practica no es algo que vayamos a hacer, ya que hay multiples librerias de programacion funcional que nos dan la funcion "curry".

Trabajar con estas funciones curry-eadas nos trae algunas ventajas
* Podemos especializar funciones genericas, pre-asignandole valores a los primeros argumentos. Esto se llama "aplicacion parcial".

* Si todas las funciones reciben un argumento y devuelven un valor, no tenemos que preocuparnos por la cantidad de argumentos, o "aridad", a la hora de componer funciones.

Que es esto de componer funciones?

[Function Composition]

"Componer funciones" no es mas que la forma matematica de decir "llamar a una funcion con el resultado de otra".

Esto podemos hacerlo directamente:

[Code: Function Composition]

El problema es que tenemos que escribir las dos llamadas cada vez que querramos hacer la composicion. Seria mas facil poder ecribir una nueva funcion que haga esto por nosotros:

[Code: Function Composition]

Ahora si.

Lo ultimo que faltaria es escribir una funcion de orden superior, como con curry. Nuevamente, escribir esa funcion en Javascript no es complicado, pero cualquier libreria de programacion funcional va a traer una funcion "compose".

Ya tenemos las dos herramientas basicas para trabajar con funciones. Lo que vamos a necesitar ahora es una forma describir o caracterizar a las funciones un poco mejor que lo que Javascript requiere.

Para eso, vamos a hablar de tipos.

[Tipos]

Como sabemos, en Javascript hay 6 tipos primitivos: Undefined, Null, Boolean, String, Number y Object. (http://www.2ality.com/2013/09/types.html)

Esto es un punto de inicio, pero no nos da el detalle que nos gustaria para poder caracterizar funciones, asi que vamos a agregar un primer nivel de detalle:

* Vamos a considerar como tipos distintas clases prototipicas de Object. De esta forma podemos hablar de Function, Date, Array, Promise, etc.

Algunos tipos, como Array, contienen otros tipos. En ese caso, vamos a indicarlo explicitamemente: Array[a], donde `a`, `b`, etc. representan un tipo cualquiera.

En estos casos tambien podemos especificar el tipo `a`, y tener por ejemplo Array[Number].

Los tipos que contienen otro tipo de modo generico, como el Array, se llaman `polimorficos`.

Tambien, en el caso de Object, podriamos definir tipos mas especificos, como por ejemplo Object[{user: String, age: Number}], pero no vamos a considerar estos casos en la charla porque la notacion es incomoda.

Con este nuevo sistema de tipos mas especifico, y el requerimiento que nos impusimos al principio de que todas las funciones tengan 1 y solo 1 argumento, podemos finalmente caracterizar a cualquier funcion con lo que se llama "firma de tipos".

[Type signature]

La firma de tipos de una funcion no es mas que el tipo de su argumento y el tipo del valor que devuelve.

Veamoslo con ejemplos:

[Code: Type signature]

De ahora en mas, vamos a comentar en todas las funciones de la charla su firma de tipos.

De este modo podemos trabajar con Javascript como si fuese un lenguaje de tipado fuerte, bajo la siguiente premisa: Mientras respetemos la firma de tipos de las funciones que usemos, todo va a estar bien. Si no las respetamos, no hay ninguna garantia sobre el resultado de las operaciones.

Un tema que no mencionamos al hablar de tipos, es como describir a las funciones mismas como argumentos de funciones de orden superior. Veamoslo:

[Code: Type signature]

Por ultimo, un par de ejemplos mas complicados: Reduce y Compose.

[Code: Type signature]

Algo interesante es que la firma de tipos realmente decribe en muchos casos el comportamiento de la funcion, ya que simplemente no hay muchas otras alternativas de manipular los tipos de entrada para obtener el tipo de salida.

===============================================================

Para que todo esto, podran preguntarse, si a fin de cuentas son solo comentarios que nadie va a tener en consideracion.

Es una pregunta valida. Al usar las firmas de tipos lo que quiero es hacer bien explicito un problema con el que lidiamos constantemente como programadores.

Y para eso quiero hablar de abstracciones, pero de una en particular. Esta abstraccion es una caja, o contenedor. Contiene uno o mas valores de algun tipo. Puede representar una estructura. Puede representar un contexto. Si suena abstracto, es porque es una abstraccion, valga la redundancia, muy generica. Y eso es lo que la hace particuparmente poderosa.

Vamos por un ejemplo concreto: Nuestro querido Array. El Array es un contenedor. Contiene 0 o mas valores. Y esos valores tienen algun tipo.

Una primer observacion: Los contenedores, como nuestro array, tambien son tipos! A priori, son tipos polimorficos. Al menos hasta que no especifiquemos explicitamente que queremos un Array[String].

En el caso del Array, nuestro contenedor representa una estructura, ya que el array en si representa el ordenamiento lineal de los valores que contiene.

Tenemos entonces nuestro primer contenedor. Veamos una serie de problemas que nos podemos encontrar como programadores funcionales con nuestro contenedor.

[Problema 1]

Tengo una funcion que transforma numeros en numeros, y un contenedor de numeros, nuestro Array.

Quiero poder usar estas dos cosas juntas, pero si miramos la firma de tipos, vemos que nuestra funcion que transforma numeros no sabe transformar arrays.

Seguramente muchos de ustedes ya saben como resolver este problema.

{Como?}

Podemos usar Array.prototype.map. Pero nosotros queremos algo mejor. Algo mas poderoso. Lo que nos gustaria es tener una funcion *carita* de orden superior, que sepa agarrar nuestras funciones que transforman numeros, y transformarlas en funciones que transformen arrays de numeros.

[Code: Problem 1]

Es decir, una funcion que pueda agarrar CUALQUIER funcion, y magicamente darle el poder de operar sobre contenedores.

[matrix]

Bueno, vamos a escribirla. Empecemos por su firma de tipos: Recibe una funcion de numero a numero y devuelve una funcion de array de numeros a array de numeros.

[Code: Problem 1]

Y ahi esta. No fue tan dificil como parecia, y tenemos nuestra funcion capaz de transformar funciones normales en funciones que saben de arrays.

Y como *carita* es molesto de escribir cada vez, vamos a llamarla `fmap`. La forma mas facil de reconocer a una `fmap` es por su firma de tipos.

Por ultimo, podemos ver que si tenemos varias funciones transformadas con `fmap`, las podemos componer entre si sin ningun problema.

`fmap` nos permite utilizar funciones que operan sobre un tipo, en un contenedor de dicho tipo.

[awesome]

[Problema 2]

Ya tenemos nuestras funciones que operan sobre arrays. Que pasa si queremos hacer el calculo a partir de un numero, y no de un array?

[Code: Problem 2]

Necesitamos otra funcion *carita* que sepa transformar numeros en arrays de numeros, de modo natural. "De modo natural" quiere decir que mientras se te ocurra una forma obvia de hacerlo, entonces esta todo bien. En el caso de arrays, tenemos una forma obvia de hacerlo:

[Code: Problem 2]

Como hicimos recien, ahora que sabemos como es *carita*, vamos a cambiarle el nombre y llamarla `unit`, o `return`.

Algo interesante de esta funcion es que la podemos componer a la salida de una funcion de transforme un array de numeros en un unico numero, y volver a tener un array.

De esta manera, podemos componer todo felizmente, ya que todas nuestras funciones transforman de array en array.

[Code: Problem 2]

Quiza ya se va viendo el patron.

[Problema 3]

El ultimo problema que tenemos que resolver es como hacemos si tenemos una funcion que transforma numeros en arrays de numeros.

[Code: Problem 3]

Dado que la funcion opera sobre numeros, nuestro primer instinto deberia ser intentar transformarla con `fmap`.

El problema es que obtenemos un array de arrays.

Necesitariamos una ultima funcion *carita* que nos permita transformar arrays de arrays en arrays, de modo natural. Nuevamente, "de modo natural" quiere decir que mientras se te ocurra una forma obvia de hacerlo, entonces esta todo bien. Y en el caso de arrays, tenemos una forma obvia de hacerlo:

[Code: Problem 3]

A esta altura ya deberian suponer que vamos a ponerle otro nombre a *carita*. En este caso, la vamos a llamar `join` o `flatten`.

Lo que podemos hacer por ultimo es componer `join` con `fmap` para obtener una nueva funcion capaz de transformar funciones de numeros en arrays, en funciones de arrays en arrays. A esta combinacion se la suele llamar `chain`.

[Parentesis]

En la solucion a estos tres problemas esta el secreto de una segunda abstraccion que especializa el concepto de contenedores, y de la cual Array tambien es un ejemplo.

Antes de ver otro ejemplo, veamos en que consiste esta abstraccion.

Comenzamos con un simple contenedor, el Array, y construimos las siguientes funciones:

[Code: Parentehsis]

Quiero poner la atencion en `fmap`, `lift` y `chain`. Las tres transforman funciones en funciones. Y las tres devuelven valores de mismo tipo: funciones que transforman arrays en arrays.

Y que entre las tres, nos permiten utilizar funciones que saben nada o a medias sobre el uso de contenedores, directamente sobre nuestros contenedores.

De esta forma, el contenedor se vuelve el "lugar comun" sobre el cual podemos aplicar sucesivamente una serie de funciones, previamente transformadas para operar exclusivamente sobre contenedores.

Y estas tres funciones son "el pegamento" que nos permite "enseñarles" a las demas funciones como comportarse en el contexto de nuestro contenedor.

[Code: Parentehsis]

Por ultimo, hay dos funciones mas que pueden aparecer en otras librerias pero que no son mas que lo mismo: `bind` y `flatmap`.

===============================================================

Acabamos de ver que el Array se ajusta a nuestra abstraccion de "contenedor",
y construimos un conjunto de funciones para poder manipular contenedores comodamente.

Vamos a ver ahora otro ejemplo distinto:

[Promises]

Promises.

En el caso de los Arrays, la abstraccion de contenedor era mas o menos clara: El Array contiene valores.

En el caso de la promesa, tambien. La diferencia es el significado que el contenedor le otorga a lo que contiene. En el caso del Array, estabmos hablando de una estructura de orden lineal. En el caso de las promesas, lo que tenemos es un contexto temporal: La promesa representa valores en el futuro.

Al igual que con los Arrays, lo que nosotros queremos hacer es operar directamente sobre el valor contenido en la promesa, sin necesidad de tener que lidiar con el contexto de la promesa en si misma. Y en efecto, esto es lo que hacemos cuando usamos `then`.

Tratemos de ver como se acomoda `then` a las funciones generales de contenedores.

[Code: Promises]

Ademas de permitirnos operar sobre el valor de la promesa, `then` transforma el resultado en una promesa si no lo es. Esto implica que no podemos tener nunca promesas de promesas (al menos no directamente).

Ahora, en este analisis fuimos absolutamente optimistas. Ademas de representar valores en el futuro, las promesas le aportan un contexto mas a nuestros valores: el de resolved o rejected. Y, al momento de acceder al valor dentro de la promesa, nos ofrecen un punto para bifurcar el flujo de nuestro programa, dependiendo de si la promesa fue resuelta o rechazada.

Algo a notar es que todo este proceso ocurre de modo transparente usuario del contenedor. Nosotros solo llamamos `then`, y no necesitamos chequear en cada caso si la promesa esta resuelta o rechazada. Esto forma parte del contexto del contenedor, y es resposabilidad de su respectiva `fmap` encargarse de ello.

Este es el poder de la abstraccion.

Vamos a ver ahora como podemos aplicar este patron para lograr nuevos casos de uso.

El primer ejemplo que voy a mostrar ataca dos de las criticas mas frecuentes a las promesas: Que son eager, y que no se pueden repetir.

Para resolverlo, vamos a implementar una version muy sencilla de Lazy Promises, usando el patron de contenedor que acabamos de ver.

Primero, necesitamos ver como implementar el concepto de lazy computations en Javascript.

[Code: Lazy Promises]

Vemos que la respuesta es, simplemente, usar funciones. Cuando usamos funciones para expresar calculos a futuro, se las suele denominar "thunks".

Entonces, ahora si, construyamos nuestro contenedor que represente una lazy promise. En este caso, nuestro contenedor va a contener un thunk, que tiene que devolver una promesa.

La receta en todos los casos es siempre la misma: Declarar el contenedor, e impelementar las funciones que necesitemos, basandonos en su firma de tipos.

Para nuestra lazy promise vamos a necesitar un metodo adicional que nos permita disparar la promesa.

Y eso es todo. Como se ve, toda la "gracia" esta en la implementacion de `map`. Y la implementacion completa son apenas 8 lineas.

El "Contenedor de thunks" en su version mas generica es un contenedor sumamente util, ya que nos permite aislar todos los side effects que podria tener nuestro codigo, permitirle a nuestras funciones ser puras a la vez que pueden expresar side effects sin problemas.

Veamos ahora un segundo ejemplo. Vamos a abstraer el concepto de control de flujo que tenemos en las promesas, pero sin la parte de contexto temporal.

La gracia en este caso consiste en definir nuestro contenedor como la union de dos contenedores especificos, cada uno representando uno de los dos estados posibles que pueden tener nuestros valores en este contenedor. En el caso de promesas, estos estados eran resolved y rejected. En este caso vamos a evitar connotaciones positivas/negativas y llamarlos Left y Right. Al contenedor que representa ambos estados lo llamamos Either.

[Code: Control Flow]

Nuevamente, el secreto va a estar en la implementacion de `map`.

Lo que vamos a hacer es evaluar si estamos frente a una instancia de Left o Right, y en funcion de eso aplicar la transformacion, o ignorarla.

[Code: Control Flow]

Ya con la implementacion de `map` tenemos algo de la funcionalidad esperada. Pero hay algunos casos donde no se comporta como nos gustaria.

Vamos a resolverlo implementando tambien `join`, y `chain` para ahorrar codigo.

Por ultimo vamos a agregar una funcion auxiliar que nos permita acceder al interior del contenedor y bifurcar el flujo de ejecucion de nuestro programa.

Como se ve, logramos capturar la misma esencia de control de flujo de promesas, y nuestra funcion `map` se comporta del mismo modo, permitiendonos aplicar sucesivas operaciones sobre un valor sin tener que preocuparos de chequear si ocurrio un error o no.

Con esto, espero haberles ayudado a ver un patron generico que como vemos nos sirve para describir tanto Arrays, como Promesas, nos permite hacer manejo de errores, y expresar efectos secundarios como calculos a futuro. Y si recordamos el ejemplo inicial de jQuery, podemos ver que el potencial de este patron va mas alla de las cosas mencionadas.

Si hasta este momento lograron seguir la charla, entonces acabo de tener exito en enseñarles sobre categorias, functores y monadas sin haber usado una sola vez ninguna de estas palabras.

Todas las cosas que fuimos viendo tienen una contraparte matematica dentro de lo que se denomina "Teoria de Categorias".

Lo interesante es que las categorias, functores y monadas tienen que respetar cada uno una serie de axiomas. Estos axiomas generalmente estan expresados como una igualdad matematica. Y las igualdades matematicas son cosa seria. Representan una garantia de que podemos intercambiar un termino por el otro, siempre, sin afectar el resultado.

Lo cual nos lleva finalmente al titulo de esta charla. Vamos a hacer nuestro programa mejor, y demostrarlo matematicamente.

[Code: Category Theory]

La "Teoria de Categorias" nos dice que Array es un Functor, ya que es un Contenedor que tiene definido `fmap`.

Y como todo Functor, obedece los axiomas de los fuctores. Entre ellos, uno que dice que `Functor F => F (g . f) = F g . F f`.

El functor aplicado sobre una funcion es `fmap`, por lo que podemos traducir el axioma en codigo `fmap(compose(g, f)) = compose(fmap(g), fmap(f))`. Y tenemos la garantia matematica de que siempre que veamos la expresion de la derecha, podemos reemplazarla por la de la izquierda, y viceversa.

Entonces, supongamos que tenemos una lista de numeros, y dos operaciones `f` y `g`.

Sabemos que el resultado de escribir `map(compose(g, f))` o `compose(fmap(g), fmap(f))` va a ser el mismo, pero... hay alguna diferencia entre las dos formas de calcular ese resultado?

Cuantas operaciones hace un approach, en comparacion al otro?

Vamos a medirlo. Podemos ver claramente que uno de los dos approaches es mas performante que el otro. Cada `map` recorre todo el array aplicando la transformada. Si aplicamos `map` por cada transformada, vamos a recorrer el array n veces. Si, por el contraro, primero componemos todas las transformaciones, podemos recorrer el array una unica vez.

Lo que acabamos de hacer es refactorear nuestro codigo basandonos unicamente en una expresion matematica. Y este es otro de los beneficios de aplicar este patron.

A los que les interese, los invito a revisar las referencias, y consultar los demas axiomas, a ver que mejoras se les puede ocurrir en base a ellos.

{Preguntas?}

Gracias