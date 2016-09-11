# Tu codigo puede ser mas simple y puedo demostrarlo matematicamente

Charla para Meetup.js Argentina sobre Programacion Funcional

## Descripcion
Programacion funcional. El ultimo grito de la moda, pero solo para aquellos dispuestos a sumergirse en la terminologia. No mas. Sin matematica ni formulas, la programacion funcional ya esta entre nosotros, y ha llegado para quedarse. Con esta charla espero sacar a la luz distintos conceptos que ya manejamos en nuestro dia a dia, y demostrar que detras de las palabras raras y los diagramas se esconde una herramienta mas para hacer nuestro codigo mas simple.


Por ultimo, tambien espero hacerle el camino un poco mas facil a quien quiera profundizar en los fundamentos teoricos de la teoria de categorias.

## TODO
* Preparar ejemplos (codigo)
* Preparar slides
* Timear y ajustar temario

## Indice
##### Introduccion
* Programacion funcional ➞ Conceptos matematicos ➞ Wikipedia ➞ Fracaso
* Comparacion jquery/arrays/promises

##### Generalidades
* Tipos. Tipos primitivos.
* Funciones. Type signature.
* Composicion de funciones

##### Cajas/Contenedores/Contextos
* Conceptualmente, contienen tipos, no valores
* Ejemplo: Array
* ⟹ Son tipos ellos mismos
* Polimoricos/monomorficos

##### Problema 1
* Usar funciones de elementos sobre las cajas
* Array ➞ map. fmap. currying.

##### Problema 2
* Iniciar el calculo a partir de un elemento (o usar ```f: [ x ] ➞ x```)
* Constructor/return/unit.

##### Problema 3
* Usar ```f: x ➞ [ x ]``` sobre listas
* Flat/join

##### Parentesis
* Listar operaciones. bind. ```[ x ] ➞ (x ➞ [ x ]) ➞ [ x ]```
* ```bind f = join (fmap f)``` [=flatmap]
* De que nos sirvio todo esto?

##### Promises
* Que representan
* Que queremos hacer sobre ellas
* then. Expresar como funcion estatica. curry. fmap?
* "Extras" de Promise (lift return values)
* Control de flujo Reject/Resolve. Manejo de errores. Comparacion con callbacks.
* Promesas de Promesas? No existencia de join? then = bind!
* ```then(...).then(...).then(...)``` [bind=chain]

##### Lazy Promises
* Thunk
* fmap
* run
* join

##### Control de flujo sincronico
* Either/Maybe
* fmap
* join

##### Teoria de Categorias
* Categoria, definicion.
* Categoria de tipos y funciones tipadas en JS
* Categoria de tipos array y funciones sobre tipos array en JS
* Subcategoria
* Functor
* (Pointed Functor)
* Monad
* Axiomas/Leyes
* Simplificar map/compose

## Referencias
* [Professor Frisby's Mostly Adequate Guide to Functional Programming](https://drboolean.gitbooks.io/mostly-adequate-guide/content/) by Brian Lonsdorf
* [Haskell/Category theory (Wikibooks)](https://en.wikibooks.org/wiki/Haskell/Category_theory)
* [You Could Have Invented Monads! (And Maybe You Already Have.)](http://blog.sigfpe.com/2006/08/you-could-have-invented-monads-and.html) by Dan Piponi
* [Translation from Haskell to JavaScript of selected portions of the best introduction to monads I’ve ever read](https://blog.jcoglan.com/2011/03/05/translation-from-haskell-to-javascript-of-selected-portions-of-the-best-introduction-to-monads-ive-ever-read/) by James Coglan
* [Faster JavaScript Through Category Theory](http://johnbender.us/2012/02/29/faster-javascript-through-category-theory/) by John Bender
* [Category theory for JavaScript programmers](https://www.youtube.com/playlist?list=PLwuUlC2HlHGe7vmItFmrdBLn6p0AS8ALX) by Mike Stay
* [Category theory (Wikipedia)](https://en.wikipedia.org/wiki/Category_theory)
* [Monad (Wikipedia)](https://en.wikipedia.org/wiki/Monad_(functional_programming))
* [Functors, Applicatives, And Monads In Pictures](http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html) by Aditya Bhargava
