const hyperclock = require('./')

const clock = hyperclock('./clock.db')

clock.createReadStream({live: true}).on('data', console.log)
