import { fastify } from "fastify";
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, } from 'fastify-type-provider-zod'
import { z } from 'zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
    origin: 'true', //Colocar a url do meu front quando possivel
})

app.post('/subscriptions', {
    schema: {
			body: z.object({
				name: z.string(),
				email: z.string().email(),
			}),
    },
}, (request, reply) => {
    const { name, email } = request.body

		//Criação do registro no DB

		return reply.status(201).send({
			name,
			email
		})
})

app.listen({port: 3333}).then(() => {
    console.log('HTTP Server Runing ')
})

//npm i tsx typescript @types/node -D : Converte código TS em JS
//npx tsc --init
//npm i @fastify/cors
//npm i zod
//npm i fastify-type-provider-zod

//To run: npx tsx src/server.ts
