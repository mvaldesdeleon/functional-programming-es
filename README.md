# Tu código puede ser más simple y puedo demostrarlo matemáticamente

Charla para Meetup.js Argentina sobre Programación Funcional

## Descripción
Programación funcional. El último grito de la moda, pero solo para aquellos dispuestos a sumergirse en la terminología. No más. Sin matemática ni formulas, la programación funcional ya esta entre nosotros, y ha llegado para quedarse. Con esta charla espero sacar a la luz distintos conceptos que ya manejamos en nuestro día a día, y demostrar que detrás de las palabras raras y los diagramas se esconde una herramienta más para hacer nuestro código más simple.


Por último, también espero hacerle el camino un poco más fácil a quien quiera profundizar en los fundamentos de la teoría de categorías.

## TODO
* Preparar ejemplos (código)
    * **Introducción** Comparación jquery/arrays/promises
    * ~~**Generalidades** Type signatures~~
    * ~~**Generalidades** Composición de funciones~~
    * ~~**Generalidades** Currying~~
    * **Problema 1**
    * **Problema 2**
    * **Problema 3**
    * **Paréntesis** bind para arrays
    * **Promises** De then a fmap
    * **Promises** Extras
    * **Promises** Control de flujo
    * **Promises** Promesas de promesas, bind/chain
    * ~~**Lazy promises** Funciones/thunks~~
    * ~~**Lazy promises** Implementación~~
    * ~~**Control de flujo** Implementación~~
    * **Teoría de categorías** Simplificar map/compose
* Preparar slides
* Timear y ajustar temario

## Indice
##### Introducción
* Programación funcional ➞ Conceptos matemáticos ➞ Wikipedia ➞ Fracaso
* Comparación jquery/arrays/promises

##### Generalidades
* Tipos. Tipos primitivos.
* Funciones. Type signature.
* Composición de funciones
* Currying

##### Cajas/Contenedores/Contextos
* Ejemplo: Array
* ⟹ Son tipos ellos mismos
* Tipos derivados. Polimórficos/monomórficos

##### Problema 1
* Usar funciones de elementos sobre las cajas
* Array ➞ map. fmap. currying.

##### Problema 2
* Iniciar el calculo a partir de un elemento (o usar ```f: [ x ] ➞ x```)
* Constructor/return/unit.

##### Problema 3
* Usar ```f: x ➞ [ x ]``` sobre listas
* Flat/join

##### Paréntesis
* Listar operaciones. bind. ```[ x ] ➞ (x ➞ [ x ]) ➞ [ x ]```
* ```bind f = join (fmap f)``` [=flatmap]
* De que nos sirvió todo esto?

##### Promises
* Que representan
* Que queremos hacer sobre ellas
* then. Expresar como función estática. curry. fmap?
* "Extras" de Promise (lift return values)
* Control de flujo Reject/Resolve. Manejo de errores. Comparación con callbacks.
* Promesas de Promesas? No existencia de join? then = bind!
* ```then(...).then(...).then(...)``` [bind=chain]

##### Lazy Promises
* Delegación de ejecución/funciones/thunks. Lazy.
* fmap
* join
* do/fork

##### Control de flujo sincrónico
* Either
* fmap
* join
* chain
* do/either

##### Teoría de Categorías
* Categoría, definición.
* Categoría de tipos y funciones tipadas en JS
* Categoría de tipos array y funciones sobre tipos array en JS
* Subcategoría
* Functor
* (Pointed Functor)
* Monad
* Axiomas/Leyes
* Simplificar map/compose

## Referencias
* **JS** [Professor Frisby's Mostly Adequate Guide to Functional Programming](https://drboolean.gitbooks.io/mostly-adequate-guide/content/) by Brian Lonsdorf
* **HS** [Functors, Applicatives, And Monads In Pictures](http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html) by Aditya Bhargava
* **HS** [Haskell/Category theory (Wikibooks)](https://en.wikibooks.org/wiki/Haskell/Category_theory)
* **JS** [Translation from Haskell to JavaScript of selected portions of the best introduction to monads I’ve ever read](https://blog.jcoglan.com/2011/03/05/translation-from-haskell-to-javascript-of-selected-portions-of-the-best-introduction-to-monads-ive-ever-read/) by James Coglan
* **HS** [You Could Have Invented Monads! (And Maybe You Already Have.)](http://blog.sigfpe.com/2006/08/you-could-have-invented-monads-and.html) by Dan Piponi
* **HS** [Functors are Containers](https://bartoszmilewski.com/2014/01/14/functors-are-containers/) by Bartosz Milewsk
* **JS** [Faster JavaScript Through Category Theory](http://johnbender.us/2012/02/29/faster-javascript-through-category-theory/) by John Bender
* **JS** [Category theory for JavaScript programmers](https://www.youtube.com/playlist?list=PLwuUlC2HlHGe7vmItFmrdBLn6p0AS8ALX) by Mike Stay
* [Category theory (Wikipedia)](https://en.wikipedia.org/wiki/Category_theory)
* [Monad (Wikipedia)](https://en.wikipedia.org/wiki/Monad_(functional_programming))
