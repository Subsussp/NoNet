import { Github, Mail, MessageCircle } from 'lucide-react';
import { storeName } from 'Var/config';

function Footer({textLeave,textEnter}) {
  return (
    <footer
      className="w-full py-8 px-6 select-none z-[3] mb-[-120px] md:mb-[-60px]"
      style={{
        fontFamily: 'var(--Main-font)',
        backgroundColor: 'var(--mainele)',
        color: 'var(--one)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2 tracking-widest" style={{ color: 'var(--one)' }}>{storeName}</h3>
            <p className="text-sm tracking-wide" style={{ color: 'var(--firstDegree)' }} onMouseEnter={textEnter} onMouseLeave={textLeave}>Building something beautiful</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/subsussp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors duration-200"
              style={{ color: 'var(--firstDegree)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--one)'
                textEnter(e)
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--firstDegree)'
                textLeave(e)
              }}
              aria-label="GitHub"
            >
              <Github size={20} />
              <span className="text-sm">GitHub</span>
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=2001091244232"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors duration-200"
              style={{ color: 'var(--firstDegree)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--one)'
                textEnter(e)
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--firstDegree)'
                textLeave(e)
              }}
              aria-label="Support"
            >
              <MessageCircle size={20} />
              <span className="text-sm">Support</span>
            </a>

            <a
              href="mailto:sofaomda738@gmail.com"
              className="flex items-center gap-2 transition-colors duration-200"
              style={{ color: 'var(--firstDegree)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--one)'
                textEnter(e)
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--firstDegree)'
                textLeave(e)

              }}
              aria-label="Email"
            >
              <Mail size={20} />
              <span className="text-sm">Contact</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 text-center" style={{ borderTopColor: 'var(--firstDegree)', borderTopWidth: '1px' }}>
          <p className="text-sm font-bold" style={{ color: 'var(--Ghover)' }} onMouseEnter={textEnter} onMouseLeave={textLeave}>
            © {new Date().getFullYear()} {storeName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
