# side.ai
AI project frontend &amp; backend 
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Layout, type PageId } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { ObjectDetection } from '@/pages/ObjectDetection';
import { TextRecognition } from '@/pages/TextRecognition';
import { CurrencyRecognition } from '@/pages/CurrencyRecognition';
import { VoiceAssistant } from '@/pages/VoiceAssistant';
import { Navigation } from '@/pages/Navigation';
import { Emergency } from '@/pages/Emergency';
import { Education } from '@/pages/Education';
import { SettingsPage } from '@/pages/SettingsPage';
import { useSettings } from '@/hooks/useSettings';
import { useSpeech } from '@/hooks/useSpeech';

function App() {
  const [page, setPage] = useState<PageId>('dashboard');
  const { settings, loading, update } = useSettings();

  const speechSettings = {
    rate: settings.voice_rate,
    pitch: settings.voice_pitch,
    voiceURI: settings.voice_uri,
  };

  const { speak, speaking, cancel } = useSpeech(speechSettings);

  // Initialize Capacitor native plugins on mobile
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    (async () => {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#1b7ef5' });
      } catch { /* StatusBar not available */ }
      try {
        await SplashScreen.hide();
      } catch { /* SplashScreen not available */ }
    })();
  }, []);

  // Apply high contrast mode
  useEffect(() => {
    if (settings.high_contrast) {
      document.documentElement.classList.add('hc-mode');
    } else {
      document.documentElement.classList.remove('hc-mode');
    }
  }, [settings.high_contrast]);

  const handleNavigate = (next: PageId) => {
    cancel();
    setPage(next);
  };

  const toggleSpeech = () => {
    if (speaking) cancel();
    else speak('Voice is ready. Navigate to a feature to begin.');
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard onNavigate={setPage} speak={speak} />;
      case 'object-detection':
        return <ObjectDetection speechSettings={speechSettings} />;
      case 'text-recognition':
        return <TextRecognition speechSettings={speechSettings} />;
      case 'currency':
        return <CurrencyRecognition speechSettings={speechSettings} />;
      case 'voice-assistant':
        return <VoiceAssistant speechSettings={speechSettings} language={settings.language} />;
      case 'navigation':
        return <Navigation speechSettings={speechSettings} />;
      case 'emergency':
        return <Emergency speechSettings={speechSettings} />;
      case 'education':
        return <Education speechSettings={speechSettings} />;
      case 'settings':
        return <SettingsPage settings={settings} loading={loading} update={update} />;
      default:
        return <Dashboard onNavigate={setPage} speak={speak} />;
    }
  };

  return (
    <Layout
      current={page}
      onNavigate={handleNavigate}
      speaking={speaking}
      onToggleSpeech={toggleSpeech}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
