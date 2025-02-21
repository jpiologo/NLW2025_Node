import { fastify } from "fastify";
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { subscribeToEventRoute } from "./routes/subscribe-to-event-route";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
    origin: 'true', //Colocar a url do meu front quando possivel
})

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'NLW Connect',
			version: '0.0.1',
		},
	},
	transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

app.register(subscribeToEventRoute)

app.listen({port: 3333}).then(() => {
    console.log('HTTP Server Runing ')
})

//install docker
//npm i tsx typescript @types/node -D : Converte código TS em JS
//npx tsc --init
//npm i @fastify/cors
//npm i zod
//npm i fastify-type-provider-zod
//REST Client vsc extention
//npm i @fastify/swagger @fastify/swagger-ui

//To run: npx tsx src/server.ts
