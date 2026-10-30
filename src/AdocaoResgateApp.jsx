
import React, { useState } from 'react';

import {
  Camera,
  CameraResultType,
  CameraSource
} from '@capacitor/camera';

export default function AdocaoResgateApp() {
  const [fotoResgate, setFotoResgate] = useState(null);
  const [mensagem, setMensagem] = useState('');

  // Função para abrir câmera ou galeria
  const resgatarPet = async () => {
    try {
      setMensagem('');

      const image = await Camera.getPhoto({
        quality: 85,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });

      // Verifica se a imagem foi selecionada
      if (image.webPath) {
        setFotoResgate(image.webPath);
        setMensagem('Oba! Foto selecionada com sucesso! 🧡');
      }

    } catch (error) {
      // Tratamento de cancelamento ou erro
      console.log('Captura cancelada ou não realizada:', error);

      setMensagem(
        'Tudo bem! Você pode tentar novamente. 🐾'
      );
    }
  };

  return (
    <main className="app-container">

      {/* Cabeçalho */}
      <header className="app-header">

        <div className="logo-paw">
          🐾
        </div>

        <h1>
          Resgate e Adoção <span>Pet</span>
        </h1>

        <p>
          Todo animal merece uma segunda chance! 🧡
        </p>

      </header>

      <section className="app-content">

        {/* Apresentação */}
        <div className="hero-card">

          <div className="hero-pets">
            🐶 🐱
          </div>

          <h2>
            Amor que transforma vidas!
          </h2>

          <p>
            Uma foto pode ser o começo de uma linda história.
          </p>

          <span className="decor decor-one">♡</span>
          <span className="decor decor-two">✿</span>

        </div>

        {/* Informações */}
        <div className="info-card">

          <div className="info-icon">
            🧡
          </div>

          <div>

            <h3>
              Ajude um animal resgatado
            </h3>

            <p>
              Registre uma foto do animal para divulgar
              sua história e ajudá-lo a encontrar um novo lar.
            </p>

          </div>

        </div>

        {/* Botão da câmera */}
        <button
          className="camera-button"
          onClick={resgatarPet}
        >

          <span>📸</span>

          Tirar Foto / Galeria

          <span>♡</span>

        </button>

        {/* Mensagem de retorno */}
        {mensagem && (

          <div className="message">
            {mensagem}
          </div>

        )}

        {/* Pré-visualização */}
        <div className="preview-section">

          <h3>
            Sua fotinho 🐾
          </h3>

          {fotoResgate ? (

            <div className="photo-card">

              <img
                src={fotoResgate}
                alt="Animal resgatado"
              />

              <p>
                Um novo começo cheio de amor! ❤️
              </p>

            </div>

          ) : (

            <div className="empty-preview">

              <div className="preview-icon">
                📸
              </div>

              <h4>
                Sua foto aparecerá aqui!
              </h4>

              <p>
                Escolha uma imagem para começar.
              </p>

            </div>

          )}

        </div>

        {/* Rodapé */}
        <footer className="app-footer">

          <div>
            🐾 🧡 🐾
          </div>

          <p>
            Pequenos gestos salvam grandes vidas.
          </p>

          <span>
            Resgate e Adoção Pet • Feito com amor
          </span>

        </footer>

      </section>

    </main>
  );
}
