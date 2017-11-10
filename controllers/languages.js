const Translate = require('@google-cloud/translate');
const projectId = 'chatsy-184715';
const translate = new Translate({
  projectId: projectId,
});
const translateFn = require('../translate')

module.exports = {

  list(req, res){
    console.log(res)
    return translate
    .getLanguages()
    .then(results => {
      const supportedLanguages = results[0];
      res.json({
        supportedLanguages
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  },

  interpret(req, res){
    console.log(req.body)
    return translateFn(translate,req.body.speechToInterpret,req.body.outputLang).then(results => {
      const translation = results[0];
      const translatedSpeech = {
        translation: `${translation}`,
        timestamp: Date.now()
      }
      console.log(translatedSpeech)
      res.json({
        translatedSpeech
      })
    })
  }



}
