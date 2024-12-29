const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const TwilioProvider = require('@bot-whatsapp/provider/twilio')
const MockAdapter = require('@bot-whatsapp/database/mock')

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['1', 'uno', '01']).addAnswer(
    [
        '¡Gracias por interesarte en nuestros programas de intercambio en el extranjero! 🌎 Indícanos tu nombre para continuar:',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 ¡Bienvenido a *Enroll Recruitment*! Soy Roy 🐶 tu asistente virtual, es un gusto atender tus consultas; antes de continuar y para darte una mejor atención, te pediremos brevemente algunos datos 🙌')
    .addAnswer(
        [
            '¿Cómo podemos ayudarte hoy?',
            '👉*1* 🌎 Información sobre los programas de intercambio.',
            '👉*2* ❔ Necesito hablar con un asesor.',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])

    const adapterProvider = createProvider(TwilioProvider, {
        accountSid: 'YOUR_ACCOUNT_SID',
        authToken: 'YOUR_ACCOUNT_TOKEN',
        vendorNumber: '+14155238886',
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()
