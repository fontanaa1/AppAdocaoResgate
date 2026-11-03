
import React, { useState } from 'react';
import {
  Camera,
  CameraResultType,
  CameraSource
} from '@capacitor/camera';

import { supabase } from './services/supabase';

export default function AdocaoResgateApp() {
  const [fotoResgate, setFotoResgate] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const resgatarPet = async () => {
    try {
      setMensagem('');
      setCarregando(true);

      if (!supabase) {
        throw new Error('Supabase não configurado. Verifique as credenciais.');
      }

      // Abre a câmera ou galeria do dispositivo
      const image = await Camera.getPhoto({
        quality: 85,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });

      if (!image.webPath) {
        throw new Error('Não foi possível acessar a imagem.');
      }

      setMensagem('Preparando sua foto... 🐾');

      // Converte a imagem em Blob
      const resposta = await fetch(image.webPath);
      const blob = await resposta.blob();

      // Define o tipo de arquivo
      const extensao = image.format || 'jpeg';
      const tipoArquivo = `image/${extensao}`;

      // Cria um nome único para a imagem
      const nomeArquivo =
        `${Date.now()}-${Math.random().toString(36).slice(2)}.${extensao}`;

      setMensagem('Enviando foto para a nuvem... ☁️');

      // Envia a imagem para o Supabase Storage
      const { data, error } = await supabase.storage
        .from('fotos-camera')
        .upload(nomeArquivo, blob, {
          contentType: tipoArquivo,
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Recupera a URL pública da imagem
      const { data: urlData } = supabase.storage
        .from('fotos-camera')
        .getPublicUrl(data.path);

      // Exibe a imagem armazenada na nuvem
      setFotoResgate(urlData.publicUrl);

      setMensagem('Foto enviada com sucesso! Seu registro está na nuvem! 🧡');

    } catch (error) {
      console.error('Erro ao capturar ou enviar foto:', error);

      if (error.message?.toLowerCase().includes('cancel')) {
        setMensagem('Captura cancelada. Você pode tentar novamente! 🐾');
      } else {
        setMensagem(
          `Não foi possível enviar a foto: ${error.message || 'Erro desconhecido'}`
        );
      }

    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <div className="logo-paw">🐾</div>
        <h1>Resgate e Adoção <span>Pet</span></h1>
        <p>Todo animal merece uma segunda chance! 🧡</p>
      </header>

      <section className="app-content">
        <div className="hero-card">
          <div className="hero-pets">🐶 🐱</div>
          <h2>Amor que transforma vidas!</h2>
          <p>Uma foto pode ser o começo de uma linda história.</p>
          <span className="decor decor-one">♡</span>
          <span className="decor decor-two">✿</span>
        </div>

        <div className="info-card">
          <div className="info-icon">🧡</div>
          <div>
            <h3>Ajude um animal resgatado</h3>
            <p>
              Registre uma foto do animal para divulgar sua história
              e ajudá-lo a encontrar um novo lar.
            </p>
          </div>
        </div>

        <button
          className="camera-button"
          onClick={resgatarPet}
          disabled={carregando}
        >
          <span>📸</span>
          {carregando ? 'Enviando foto...' : 'Tirar Foto / Galeria'}
          <span>♡</span>
        </button>

        {mensagem && (
          <div className="message">
            {mensagem}
          </div>
        )}

        <div className="preview-section">
          <h3>Sua fotinho 🐾</h3>

          {fotoResgate ? (
            <div className="photo-card">
              <img src={fotoResgate} alt="Animal resgatado" />
              <p>Um novo começo cheio de amor! ❤️</p>
            </div>
          ) : (
            <div className="empty-preview">
              <div className="preview-icon">📸</div>
              <h4>Sua foto aparecerá aqui!</h4>
              <p>Escolha uma imagem para começar.</p>
            </div>
          )}
        </div>

        <footer className="app-footer">
          <div>🐾 🧡 🐾</div>
          <p>Pequenos gestos salvam grandes vidas.</p>
          <span>Resgate e Adoção Pet • Feito com amor</span>
        </footer>
      </section>
    </main>
  );
}
