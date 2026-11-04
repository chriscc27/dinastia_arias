const messages = [
  'Desarrollamos frameworks de calidad integral y automatización para las 7 verticales tecnológicas de AITECH.',
  'Garantizamos la excelencia técnica y operativa en Software, Hardware, Redes, Seguridad, Cloud, Big Data y Calidad.',
  'Aplicamos estándares internacionales ISO/IEEE y metodología científica para la prevención de fallos y optimización continua.',
];

export default function HeroScrollText({ progress }) {
  const textProgress = Math.max(0, (progress - .06) / .94);
  const index = Math.min(messages.length - 1, Math.floor(textProgress * messages.length));
  const revealed = Math.ceil(Math.min(1, (textProgress * messages.length) - index) * messages[index].length);
  let characterIndex = 0;

  return (
    <div className="hero_scroller_prominent">
      <div className="scroller_content_grid">
        <div className="content_index" aria-hidden="true">
          <div className="index_inner"><span className="index_current">0{index + 1}</span><span className="index_divider">/</span><span className="index_total">03</span></div>
        </div>
        <div className="content_main_prominent">
          <div className="scroller_item active" data-message={index + 1}>
            <p className="scroller_prominent_heading" aria-label={messages[index]}>
              <span aria-hidden="true">
                {messages[index].split(' ').map((word, wordIndex) => {
                  const start = characterIndex;
                  characterIndex += word.length + 1;
                  const highlight = ['Software', 'Hardware', 'Redes', 'Seguridad', 'Cloud', 'Big', 'Data', 'Calidad', 'AITECH', 'ISO/IEEE'].includes(word.replace(/[.,;:]/g, ''));
                  return (
                    <span key={wordIndex} className="word_group">
                      {Array.from(word).map((char, offset) => <span key={offset} className={`char_reveal${start + offset < revealed ? ' revealed' : ''}${highlight ? ' highlight' : ''}`}>{char}</span>)}
                      <span className="word_space">&nbsp;</span>
                    </span>
                  );
                })}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
