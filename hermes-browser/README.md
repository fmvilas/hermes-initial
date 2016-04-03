# Description

Reading about existing client frameworks/architectures such as Flux or Redux, i thought that maybe existing
frameworks/architectures that we already use in the asynchronous microservices world (such as AMQP or RabbitMQ) may also works for another
client solutions. And even that ones could work in front-end too.

Architecture is based on these key concepts:

* Connection Adapter
* Exchange
  * Topic Exchange
  * Direct Exchange
  * Fanout Exchange
  * Headers Exchange
* Message
* Consumer

Message is published to an Exchange.
Exchange is bound to another Exchange or Connection Adapter.
Middleware registers itself in an Exchange.
Consumer registers itself in an Exchange.

Message ==> Middlewares 1 ==> Exchange 1 ==> Middlewares N ==> Exchange N ==> Connection Adapter ==> Middlewares ==> Consumer
