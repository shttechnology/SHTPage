import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Menu, X, ArrowRight, Code2, Smartphone, Zap, Users, Target, CheckCircle2, Mail, MessageSquare, Send } from 'lucide-react';

// ─── EmailJS ─────────────────────────────────────────────────────────────────
// Substitua após criar sua conta em emailjs.com (veja instruções abaixo)
const EMAILJS_SERVICE_ID  = 'service_b656u9f';
const EMAILJS_TEMPLATE_ID = 'template_r7njvuw';
const EMAILJS_PUBLIC_KEY  = 'KBpMebmWwngtoAlcV';

// ─── WhatsApp ─────────────────────────────────────────────────────────────────
const WA_LINK = 'https://wa.me/5527999962494';

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'Não informado',
          service: formData.service,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Botão flutuante WhatsApp ── */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all group"
        aria-label="Falar no WhatsApp"
      >
        <WhatsAppIcon size={26} />
        <span className="font-semibold text-sm hidden sm:block">Falar no WhatsApp</span>
      </a>

      {/* ── Navegação ── */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img
                src="/davinci_crie_uma_logo_marca_para_a_empresa_sht_technology__(1).png"
                alt="SHT Technology"
                className="h-8 w-auto"
              />
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('sobre')} className="text-gray-700 hover:text-orange-600 transition font-medium">Sobre</button>
              <button onClick={() => scrollToSection('servicos')} className="text-gray-700 hover:text-orange-600 transition font-medium">Serviços</button>
              <button onClick={() => scrollToSection('valores')} className="text-gray-700 hover:text-orange-600 transition font-medium">Valores</button>
              <button onClick={() => scrollToSection('contato')} className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium">Contato</button>
            </div>

            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <button onClick={() => scrollToSection('sobre')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">Sobre</button>
              <button onClick={() => scrollToSection('servicos')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">Serviços</button>
              <button onClick={() => scrollToSection('valores')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">Valores</button>
              <button onClick={() => scrollToSection('contato')} className="block w-full px-4 py-2 bg-orange-600 text-white rounded-lg">Contato</button>
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Transformando <span className="text-orange-600">tecnologia</span> em resultados
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Soluções tecnológicas inteligentes que simplificam processos, melhoram resultados e impulsionam a evolução digital da sua empresa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('contato')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold group"
                >
                  Comece agora
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                </button>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
                >
                  <WhatsAppIcon size={20} />
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur-3xl opacity-20"></div>
              <img
                src="/davinci_crie_uma_logo_marca_para_a_empresa_sht_technology__(1).png"
                alt="SHT Technology"
                className="relative w-full max-w-md h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Sobre ── */}
      <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sobre a SHT Technology</h2>
            <p className="text-xl text-gray-600">Inovação, conhecimento e qualidade no desenvolvimento de soluções tecnológicas</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Missão</h3>
              <p className="text-gray-600 leading-relaxed">
                Criar soluções tecnológicas inteligentes que auxiliem empresas e usuários a simplificarem processos, melhorarem seus resultados e evoluírem digitalmente.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-xl border border-orange-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visão</h3>
              <p className="text-gray-600 leading-relaxed">
                Atuar com qualidade, conhecimento e inovação tecnológica para apoiar empresas e usuários no crescimento de seus negócios e no desenvolvimento de soluções modernas e eficientes.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Posicionamento</h3>
              <p className="text-gray-600 leading-relaxed">
                Oferecemos soluções em desenvolvimento de software, aplicativos mobile, inteligência artificial e integração de sistemas para modernizar sua empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Serviços ── */}
      <section id="servicos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
            <p className="text-xl text-gray-600">Soluções completas para transformar sua operação</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-orange-400 transition hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Code2 size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Desenvolvimento de Software</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Aplicações web personalizadas e escaláveis que automatizam processos, aumentam eficiência operacional e geram resultados mensuráveis para seu negócio.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-600" />Arquitetura moderna e robusta</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-600" />Integração com sistemas existentes</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-600" />Suporte e manutenção contínua</li>
              </ul>
            </div>

            <div className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-orange-400 transition hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Smartphone size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Aplicativos Mobile</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Apps iOS e Android de alta performance que conectam sua empresa com clientes, oferecem experiências intuitivas e impulsionam engagement e crescimento.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-600" />iOS e Android nativos</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-600" />Experiência de usuário intuitiva</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-600" />Performance otimizada</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section id="valores" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nossos Valores</h2>
            <p className="text-xl text-gray-600">Princípios que guiam nossas decisões e ações</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Responsabilidade', icon: Target },
              { title: 'Honestidade',      icon: CheckCircle2 },
              { title: 'Comprometimento',  icon: Zap },
              { title: 'Trabalho em Equipe', icon: Users },
              { title: 'Persistência',     icon: ArrowRight },
              { title: 'Inovação Tecnológica', icon: Code2 },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 text-center hover:border-orange-400 transition">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{value.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Por que escolher ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Por que escolher a SHT Technology?</h2>
              <div className="space-y-4">
                {[
                  'Equipe experiente em tecnologias de ponta',
                  'Soluções personalizadas para suas necessidades',
                  'Foco em resultados e ROI',
                  'Suporte dedicado e contínuo',
                  'Compromisso com qualidade e inovação',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <CheckCircle2 size={16} className="text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-12 border border-orange-200">
              <p className="text-2xl font-bold text-gray-900 mb-2">"Transformando tecnologia em resultados"</p>
              <p className="text-gray-600">Nosso compromisso é oferecer soluções que impulsionam sua empresa para o futuro digital.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contato ── */}
      <section id="contato" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Entre em Contato</h2>
            <p className="text-xl text-gray-300">Escolha a forma mais conveniente para falar conosco</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Canais de contato */}
            <div className="space-y-5">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-green-500 hover:bg-green-600 rounded-xl transition group"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <WhatsAppIcon size={26} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">WhatsApp</h3>
                  <p className="text-green-100 text-sm">Clique e receba opções de serviços na conversa</p>
                </div>
                <ArrowRight size={20} className="text-white group-hover:translate-x-1 transition" />
              </a>

              <a
                href="mailto:shttecnology@gmail.com"
                className="flex items-center gap-4 p-6 bg-orange-600 hover:bg-orange-700 rounded-xl transition group"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">E-mail</h3>
                  <p className="text-orange-100 text-sm">shttecnology@gmail.com</p>
                </div>
                <ArrowRight size={20} className="text-white group-hover:translate-x-1 transition" />
              </a>

              <div className="p-6 bg-white/10 rounded-xl border border-white/20">
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                  <MessageSquare size={20} className="text-orange-400" />
                  Horário de Atendimento
                </h3>
                <p className="text-gray-300 text-sm">Segunda a Sexta: 08h às 18h</p>
                <p className="text-gray-300 text-sm">Sábado: 08h às 12h</p>
              </div>

              <div className="p-6 bg-white/10 rounded-xl border border-white/20">
                <h3 className="text-white font-bold mb-2">Resposta automática via WhatsApp</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Ao clicar no botão WhatsApp, uma mensagem com as opções de serviços é enviada automaticamente para iniciar o atendimento.
                </p>
              </div>
            </div>

            {/* Formulário */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Enviar Mensagem</h3>

              {formStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Mensagem enviada!</h4>
                  <p className="text-gray-600 mb-4">Entraremos em contato em breve.</p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(27) 99999-9999"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Serviço de Interesse *</label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-white"
                    >
                      <option value="">Selecione um serviço...</option>
                      <option value="Desenvolvimento de Software">Desenvolvimento de Software</option>
                      <option value="Aplicativos Mobile">Aplicativos Mobile (iOS/Android)</option>
                      <option value="Inteligência Artificial e Automação">Inteligência Artificial e Automação</option>
                      <option value="Integração de Sistemas">Integração de Sistemas</option>
                      <option value="Consultoria em TI">Consultoria em TI</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Descreva sua necessidade..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
                    />
                  </div>

                  {formStatus === 'error' && (
                    <p className="text-red-600 text-sm">
                      Erro ao enviar. Tente pelo{' '}
                      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a>
                      {' '}ou e-mail direto.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white rounded-lg font-semibold transition"
                  >
                    {formStatus === 'sending' ? (
                      'Enviando...'
                    ) : (
                      <><Send size={18} />Enviar Mensagem</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img
                src="/davinci_crie_uma_logo_marca_para_a_empresa_sht_technology__(1).png"
                alt="SHT Technology"
                className="h-8 w-auto mb-4"
              />
              <p className="text-sm">Transformando tecnologia em resultados.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('sobre')} className="hover:text-orange-600 transition">Sobre</button></li>
                <li><button onClick={() => scrollToSection('servicos')} className="hover:text-orange-600 transition">Serviços</button></li>
                <li><button onClick={() => scrollToSection('valores')} className="hover:text-orange-600 transition">Valores</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm">
                <li>Desenvolvimento Web</li>
                <li>Apps Mobile</li>
                <li>Integração de Sistemas</li>
                <li>Inteligência Artificial</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contato</h4>
              <a href="mailto:shttecnology@gmail.com" className="text-sm hover:text-orange-600 transition block mb-2">
                shttecnology@gmail.com
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-green-400 transition flex items-center gap-1">
                <WhatsAppIcon size={14} />
                WhatsApp
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 SHT Technology. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
