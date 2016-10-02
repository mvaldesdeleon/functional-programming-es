[Titulo]

Motivacion
==========

Esta es una charla de programacion funcional.

Durante varios meses estuve viendo otras charlas sobre el tema, y leyendo articulos y blog posts, y algo que note es que en general a todos parece costarles mucho explicar ciertos conceptos sin caer inmediatamente en palabras raras, definiciones salidas de la nada, y diagramas locos sacados de algun libro de algebra.

[Diagrama]

Estos diagramas les encantan.

[Mas diagramas]

Y la verdad, medio que me hinchaba un poco, ya que la sensacion era "mira, vos tenes que entender estas formulas locas y despues, creeme, te va a servir para programar mejor", y me parece que ese enfoque no va.

Asi que, despues de haberme dado la cabeza contra la pared un rato y lograr decifrar algunos de esos diagramas locos, me parecio que era necesaria una charla que intente hacer lo opuesto: Encarar el tema desde el punto de vista de un programador JavaScript.

[JS Logo]

Lo primero que quiero que sepan es que, como programadores de JavaScript en el año 2016, ya todos nosotros estamos familiarizados con muchos de los conceptos de programacion funcional, incluso los de nombre loco, formulas y diagramas.

[Lambda Logo Glitch]

Simplemente no sabemos que tienen esos nombres, porque la verdad, no nos interesa. Lo importante para nosotros es que entendamos como usar la herramienta, no el nombre que un matematico le dio.

La idea de la charla es mas hacer una introspeccion en ciertos patrones de codigo que escribimos, y ver porque nos terminan resultando utiles al punto de que los hacemos aparecer una y otra vez, aun sin darnos cuenta de ello.

Y como nuestro lenguaje por excelencia es el codigo, empecemos con tres ejemplos:

[Ejemplos]

Discusion
---------
* Que pueden decir al respecto?
* Por que son distintas?
* Que palabras pueden asociar con una clase de solucion, versus la otra?
* Alguna es "mejor"?
* Por que?


Lo Basico
=========

Para empezar, hay dos conceptos que vamos a necesitar ponerles nombre y apellido (en un caso literalmente), ya que son herramientas basicas en el mundo de la programacion funcional.

El primero nos permite transformar una funcion de 2 o mas argumentos, en una serie de funciones que toman 1 argumento a la vez.

Alguien sabe a que me refiero?

[Curry (Comida)]

Curry.

[Curry (Haskell)]

Haskell Curry.

[Code: Curry]

Tenemos una funcion de 4 argumentos.

Escribamos lo que queremos: transformar una funcion de 4 argumentos, en una funcion que recibe un argumento y devuelve otra funcion...
Que recibe un argumento y devuelve otra funcion...
Que recibe un argumento y devuelve otra funcion...
Que finalmente devuelve el calculo con los 4 valores a la vez.

Por suerte tenemos ES6 y las arrow functions, que nos permiten escribir lo mismo de forma mucho mas directa:

[Code: Curry]

En la practica, cuando querramos currificar una funcion no vamos a hacerlo a mano. Todas las librerias de programacion funcional traen una funcion `curry` que hace transforma funciones de este modo.

De que nos sirve usar funciones curryficadas?

Basicamente por dos motivos:

[Code: Partial Application]

* Podemos especializar funciones genericas, pre-asignandole valores a los primeros argumentos. Esto se llama "aplicacion parcial".

* Si todas las funciones reciben un argumento y devuelven un valor, no tenemos que preocuparnos por la cantidad de argumentos, o "aridad", a la hora de componer funciones.

Veamos que es esto de la composicion de funciones.

[Diagrama: Composicion de funciones]

Perdon, habiamos dicho nada de diagramas.

[`let y = f(g(x));`]

Composicion de funciones.

Por que algo tan sencillo como llamar a una funcion con el resultado de otra merece tener nombre y apellido (en este caso, no literalmente)?

[Code: Long composition]

Porque lo que queremos es una forma generica de componer funciones, muchas, sin tener que andar escribiendo todos esos parentesis, donde seguro en algun lado nos vamos a olvidar alguno.

[Code: Compose function]

Como en el caso de `curry`, cualquier libreria de programacion funcional va a traer una funcion `compose`, que recibe una lista de funciones (o un array de funciones) y nos devuelve una nueva funcion que recibe un argumento y que las llama a todas en orden (Ojo! De derecha a izquierda, como los matematicos!), pasandole a cada funcion el resultado de la anterior, y devolviendo lo que la ultima devuelva.

Si a alguien le interesa, en los ejemplos del repo hay una funcion `curry` y una funcion `compose` genericas escritas a manopla con comentarios, para que vean que no hay ninguna magia negra detras.


Tipos
=====

Ahora viene la parte donde me toca hacer de vendedor de tiempos compartidos. Prometi no hablar de matematicas ni de palabras locas, pero para poder seguir adelante necesito ALGUN hilo de formalismo. Elegi el que me parecio mas conveniente a nosotros como programadores, y voy a tratar de pasarlo lo mas rapido posible.

De ahora en mas, vamos a hacer de cuenta que JavaScript es un lenguaje fuertemente tipado. Y como vamos a estar hablando de funciones, lo que nos va a importar es definir la firma de tipos de las funciones.

Veamos primero algunos ejemplos de los tipos que vamos a usar:

[Code: Type Examples]

Y ahora, algunos ejemplos de funciones:

[Code: Type Signatures]

Recordemos que siempre que hablemos de funciones vamos a asumir que estan currificadas.

Entonces, dado que JavaScript no es un lenguaje fuertemente tipado, la idea va a ser la siguiente:

[Code: Obey the law & break the law]

Si nosotros nos portamos bien y le pasamos a la funcion lo que la funcion espera, la funcion se va a portar bien y nos va a devolver lo que dice que devuelve.

Y si nosotros nos portamos mal y le damos otra cosa, la funcion tiene la libertad de hacer lo que se le de la gana, y que Dios se apiade de nuestras almas.

Un ultimo ejemplo que tenemos que ver es el de funciones de orden superior (es decir, funciones que reciben funciones como argumentos y/o devuelven funciones como valor de retorno):

[Code: Type Signatures, H.O.F.]

[Code: Haskell `:t foldl`]

Bueno, listo. Eso es todo lo que vamos a necesitar.

La idea entonces va a ser tratar de usar los tipos como herramienta para sacar a la luz una serie de patrones de diseño, estudiando tres situaciones distintas a resolver programando.


Entornos
========

Nuestra serie de patrones comienza con una abstraccion: Un entorno.

En distintas charlas y articulos la gente usa distintas palabras, como "Caja", "Contenedor", "Contexto". El problema para mi es que todas estas palabras estan en cierta forma aislando la abstraccion a algo mas especifico. La abstraccion es mucho mas generica de lo que parece, y por eso, de momento, la palabra que elegi es "entorno".

En este entorno hay un "algo". Pero este "algo", no esta solo. Esta dentro de su "entorno", lo cual le otorga un significado "extra".

[Algo metafisico]

Perdon, ese slide es del meetup de metafisica.

Estabamos hablando de JavaScript.

[Code: Environment]

Nuestro "algo", va a ser cualquier cosa que podamos guardar en una variable (lo cual, dicho sea de paso, implica que va a tener un tipo).

Y nuestro "entorno" va a ser algo que pueda contener al "algo". En la version mas sencilla, eso seria un objeto, con una variable, llamemosla `__value`, que contiene su respectivo "algo" (lo cual, dicho sea de paso, implica que nuestros "entornos" tambien van a tener un tipo).

Vamos a hacer nuestro estudio inicial usando un tipo de "entorno" con el que ya todos estamos familiarizados. Este "entorno" contiene 0 o mas valores, y los imbue con el siguiente significado: La existencia de un orden lineal entre dichos valores.

[Code: Array of numbers]

Estamos hablando, señores, de un array.


Caso 1
======

[Code: Problem 1]

Tengo una funcion que transforma numeros en numeros, y un "entorno" de numeros, nuestro Array.

Quiero poder usar estas dos cosas juntas, pero si miramos la firma de tipos, vemos que nuestra funcion que transforma numeros no sabe transformar arrays.

Seguramente muchos de ustedes ya saben como resolver este problema. Como dije al principio, ya somos todos programadores funcionales.

Como hay que hacer?

Si, podriamos usar Array.prototype.map. Pero nosotros buscamos algo mejor. Algo mas poderoso. Algo mas generico.

[Code: Problem 1]

Lo que nos gustaria en el fondo es tener una nueva funcion que sepa hacer lo mismo que la funcion que ya tenemos, pero sobre arrays.

[Code: Problem 1]

Y no solo eso: Lo que *realmente* buscamos es tener una funcion generica *carita* de orden superior, que sepa agarrar nuestras funciones que transforman numeros, y transformarlas en funciones que transformen arrays de numeros.

Vamos a escribirla. Empecemos por su firma de tipos: Recibe una funcion de numero a numero y devuelve una funcion de array de numeros a array de numeros.

[Code: Problem 1]

Ahi esta. No fue tan dificil como parecia, y tenemos nuestra funcion capaz de transformar funciones normales en funciones que saben de arrays.

Y como *carita* es molesto de escribir cada vez, vamos a llamarla `fmap`.

Porque si.

La forma mas facil de reconocer a una `fmap` es por su firma de tipos.

El poder de `fmap` es que puede agarrar CUALQUIER funcion que pueda operar sobre los "algos", y magicamente imbuirla con el conocimiento necesario para operar sobre "entornos".

[Matrix - I know kung-fu]

[Code: Problem 1]

Por ultimo, podemos ver que si tenemos varias funciones transformadas con `fmap`, las podemos componer entre si sin ningun problema.

`fmap` nos permite utilizar funciones que operan sobre un tipo, en un "entorno" de "algo" de dicho tipo.


Caso 2
======

[Code: Problem 2]

Ya tenemos nuestras funciones que operan sobre arrays. Que pasa si queremos hacer el calculo a partir de un numero, y no de un array?

[Code: Problem 2]

Necesitamos otra funcion *carita* que sepa transformar numeros en arrays de numeros, de modo natural.

"De modo natural" quiere decir que mientras se te ocurra una forma obvia de hacerlo, entonces esta todo bien. Que es otra forma de decir "here be mathematical dragons".

En el caso de arrays, tenemos una forma obvia de hacerlo:

[Code: Problem 2]

Como hicimos recien, ahora que sabemos como es *carita*, vamos a cambiarle el nombre y llamarla `unit`, o `return`.

Porque si.

Algo divertido de esta funcion es que si la componemos a la salida de una funcion de transforme un array de numeros en un unico numero, nos va devolver un array de numeros.

[Code: Problem 2]

Vamos a llamar a esta funcion `lift`.

Porque si.

De esta manera, podemos componer todo felizmente, ya que todas nuestras funciones transforman de array en array.

Caso 3
======

[Code: Problem 3]

El ultimo problema que tenemos que resolver es como hacemos si tenemos una funcion que transforma numeros en arrays de numeros.

Dado que la funcion opera sobre numeros, nuestro primer instinto deberia ser intentar transformarla con `fmap`.

[Code: Problem 3]

El problema es que obtenemos un array de arrays.

Necesitariamos una ultima funcion *carita* que nos permita transformar arrays de arrays en arrays, de modo natural.

Nuevamente, "de modo natural" quiere decir que mientras se te ocurra una forma obvia de hacerlo ningun matematico nos va a putear.

Por suerte el array se copa, y nos da una forma obvia de hacer esto:

[Code: Problem 3]

A esta altura ya deberian suponer que vamos a ponerle otro nombre a *carita*. En este caso, la vamos a llamar `join` o `flatten`.

[Code: Problem 3]

Lo que podemos hacer por ultimo es componer `join` con `fmap` para obtener una nueva funcion capaz de transformar funciones de numeros en arrays, en funciones de arrays en arrays. A esta combinacion la podemos llamar `chain`.

Porque si.


Resumen
=======

[Cake Portal]

Y eso es todo. Felicitaciones, ya saben lo basico sobre categorias, functores y monadas, y no tuve que mencionar estas palabras ni una sola vez.

[wat]

Tratemos de entender que fue lo que hicimos. En el fondo, construimo 5 funciones para ayudarnos con los tres casos. Las 5 funciones todas juntas para mi no dicen mucho, pero agrupadas de cierta forma el mensaje es un poco mas claro.

Veamos estas tres: `fmap`, `unit` y `join`. `fmap` permite aplicar funciones sobre los valores dentro de los entornos, y nos abstrae de toda la logica interna al entorno mismo. `unit` nos permite meter valores en un entorno *default*. Y `join` nos permite desempaquetar entornos anidados.

Otra forma de verlas es mirar estas tres: `fmap`, `lift` y `chain`.

[Code: Parenthesis]

Que tienen en comun y que tienen de distinto?

Las tres transforman funciones en funciones. Y las tres devuelven valores de mismo tipo: funciones que transforman arrays en arrays.

Y si miramos la firma de tipos de la funcion que aceptan como argument, vemos que entre las tres tenemos todas las combinaciones posibles de numero y array de numero posible (salvo, por supuesto, de array a array).

Gracias a `fmap`, `lift` y `chain`, podemos componer los 4 tipos de funciones posibles desde y hacia numeros y arrays, y despreocuparnos por si estamos trabajando con numeros, o con arrays.

`fmap` nos permite despreocuparnos por el "entorno" y concentrarnos exclusivamente en el "algo".

`lift`/`unit` nos permiten imbuir a un "algo" de un "entorno".

Y `chain`/`join` nos permiten despreocuparnos por tener "entornos" anidados (ya que nada impide que un "algo" sea a su vez un "entorno").

Por completitud, si alguien va a leer mas sobre el tema puede encontrarse con otros nombres arbitrarios. En Haskell por ejemplo no hay `chain` pero hay `bind`. En ReactiveX existe `flatmap`. Es todo lo mismo. Y si, los *reactive streams* son "entornos" tambien. Pero esa es otra charla.

Acabamos de ver que el Array se ajusta a nuestra abstraccion de "entorno",
y construimos un conjunto de funciones para poder manipular "entornos" comodamente.

Vamos a ver ahora otro ejemplo distinto.


Promises
========

En el caso de las Promises, el "algo" es cualquier cosa que podamos guardar en una variable.

Y el "entorno" le otorga dos clases de significados: En primer lugar, imbue a nuestro "algo" de un contexto temporal, ya que la Promise representa valores en el futuro. En segundo lugar, imbue a nuestro "algo" de un contexto binario "positivo"/"negativo", ya que la Promise puede ser resuelta, o bien rechazada.

[Code: Promises]

Al igual que array, lo que nosotros vamos a querer es poder operar sobre el "algo" sin preocuparnos del "entorno".

Eso quiere decir que vamos a necesitar alguna de las funciones que inventamos antes.

Veamos si podemos.

Empecemos por lo mas facil: Como metemos "algo" adentro de una Promise?

[Code: Promises]

Bam! Tenemos `unit`. En este caso, tenemos dos sabores de `unit` distintos, dependiendo si queremos meter a nuestro "algo" en una Promise resuelta, o en una rechazada.

Siguiente pregunta: Como operamos sobre el "algo" adentro de una Promise?

[Code: Promises]

Bam! Tenemos `fmap`. O tenemos `chain`?

En realidad, `then` es algo a mitad de camino. Puede comportarse tanto como `fmap` como como `chain`, con una salvedad: Nunca va a generar Promises anidadas.

Al que le interese profundizar, en el repo hay unos ejemplos que entran mas en detalle con esto, o podemos verlo despues de la charla.

[Code: Promises]

Tambien es interesante notar como `then` nos permite abstraernos por completo del "entorno". No solo del hecho de que los valores son valores futuros, sino tambien del hecho de que la Promise puede estar resuelta o rechazada.

En la practica, esto no solo nos resuelve el *callback hell*, sino que nos ahorra de chequear `err` dentro de cada funcion. El "entorno" se encarga de eso por nosotros.

Por ultimo, ademas de comportarse como `fmap`/`chain`, `then` nos ofrece una forma de bifurcar el flujo de la aplicacion, ya que acepta dos funciones, no solo una, y las ejecuta condicionalmente en funcion de si la promesa es resuelta o rechazada. Esto mismo podemos hacerlo directamente con `catch`.


Lazy Promises
=============

Bueno, basta de mirar lo que ya tenemos. Tratemos de armar algo nuevo.

Dos de las criticas mas frecuentes que reciben las Promises es que son *eager*, y que no se pueden repetir.

Primero, necesitamos ver como implementar el concepto de *lazy computations* en JavaScript.

[Code: Lazy Promises]

Vemos que la respuesta es, simplemente, usar funciones. Cuando usamos funciones para expresar calculos a futuro, se las suele denominar "thunks".

Porque si.

Entonces, ahora si, construyamos nuestro "entorno" que represente una lazy promise. En este caso, nuestro "entorno" va a contener un thunk, que tiene que devolver una promesa.

[Code: Lazy Promises]

La receta en todos los casos es siempre la misma: Declarar el contenedor, e impelementar las funciones que necesitemos, basandonos en su firma de tipos.

[Code: Lazy Promises]

Para nuestra lazy promise vamos a necesitar un metodo adicional que nos permita disparar la promesa.

Y eso es todo. Como se ve, toda la "gracia" esta en la implementacion de `map`. Y la implementacion completa son apenas 8 lineas.

Al que le interese leer mas, este tipo particular de "entorno" aparece bajo el nombre de `IO`, y (los demas olvidense lo que voy a decir) permite escribir codigo puro sin privarnos de los deliciosos side effects.


Control de Flujo
================

Vamos con otro ejemplo. Vamos a armar un "entorno" que represente el concepto de bifurcacion logica que implementa Promises con resueltas y rechazadas.

[Code: Control Flow]

Ya que JavaScript nos lo permite, vamos a empezar definiendo dos "entornos" distintos, uno para cada caso, como clases que heredan prototipicamente del "entorno" generico.

[Code: Control Flow]

Siguiendo con nuestra receta, vamos a escribir `unit`.

[Code: Control Flow]

La magia de nuestro "entorno" va a estar en la implementacion de `map`. Aqui vamos a controlar que sub-tipo de "entorno" tenemos, y decidir como actuar en funcion de ello.

Los nombres elegidos son los que aparecen en la literatura, y en los lenguajes que tienen estas cosas definidas de fabrica.

[Code: Control Flow]

Ya con la implementacion de `map` tenemos algo de la funcionalidad esperada. Pero hay algunos casos donde no se comporta como nos gustaria.

[Code: Control Flow]

Vamos a resolverlo implementando tambien `join`, y `chain` para ahorrar codigo.

[Code: Control Flow]

Por ultimo vamos a agregar una funcion auxiliar que nos permita acceder al interior del contenedor y bifurcar el flujo de ejecucion de nuestro programa.

Como se ve, logramos capturar la misma esencia de control de flujo de promesas, y nuestra funcion `map` se comporta del mismo modo, permitiendonos aplicar sucesivas operaciones sobre un valor sin tener que preocuparos de chequear si ocurrio un error o no.


Resumen 2
=========

Todos estos ejemplos que vimos, aun cuando por afuera parecen ser cosas totalmente distintas, estan implementando la misma abstraccion, que se basa en nuestro concepto de "entorno".

Y lo que nosotros como programadores tenemos que notar, es que cada vez que aparecen, las cosas se hacen mas faciles.

Eso no es una casualidad. Y es algo que tenemos que empezar a explotar concientemente.


Teoria de Categorias
====================

Todas las cosas que fuimos viendo tienen una contraparte matematica dentro de lo que se denomina "Teoria de Categorias".

[Diagrama: Categorias]

Lo interesante es que las categorias, functores y monadas tienen que respetar cada uno una serie de axiomas.

[Axiomas]

Estos axiomas generalmente estan expresados como una igualdad matematica. Y las igualdades matematicas son cosa seria. Representan una garantia de que podemos intercambiar un termino por el otro, siempre, sin afectar el resultado.

[Titulo]

Lo cual nos lleva finalmente al titulo de esta charla. Vamos a hacer nuestro programa mejor, y demostrarlo matematicamente.

La "Teoria de Categorias" nos dice que el array es un Functor, ya que es un "entorno" que tiene definido `fmap`.

Y como todo Functor, obedece los axiomas de los fuctores. Entre ellos, uno que dice que `Functor F => F (g . f) = F g . F f`.

[`Functor F => F (g . f) = F g . F f`]

El functor aplicado sobre una funcion es `fmap`, por lo que podemos traducir el axioma en codigo:

[`fmap(compose(g, f)) = compose(fmap(g), fmap(f))`]

Y tenemos la garantia matematica de que siempre que veamos la expresion de la derecha, podemos reemplazarla por la de la izquierda, y viceversa.

[Code: Category Theory]

Entonces, supongamos que tenemos una lista de numeros, y dos operaciones `f` y `g`.

Sabemos que el resultado de escribir `map(compose(g, f))` o `compose(fmap(g), fmap(f))` va a ser el mismo, pero... hay alguna diferencia entre las dos formas de calcular ese resultado?

[Code: Category Theory]

Cuantas operaciones hace un approach, en comparacion al otro?

[Code: Category Theory]

Vamos a medirlo.

Podemos ver claramente que uno de los dos approaches es mas performante que el otro.

Cada `map` recorre todo el array aplicando la transformada.

Si aplicamos `map` por cada transformada, vamos a recorrer el array n veces. Si, por el contraro, primero componemos todas las transformaciones, podemos recorrer el array una unica vez.

[Code: Category Theory]

Lo que acabamos de hacer es refactorear nuestro codigo basandonos unicamente en una expresion matematica. Y este es otro de los beneficios de aplicar este patron.

[Awesome!]

A los que les interese, los invito a revisar las referencias, y consultar los demas axiomas, a ver que mejoras se les puede ocurrir en base a ellos.

[Preguntas]

Preguntas?

[Referencias]

[Gracias]

Gracias
