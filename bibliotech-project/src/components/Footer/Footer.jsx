import "./Footer.css"

export function Footer() {
    return (<>
        <div className="footer">
            <section className="inicio">
                <h5>Inicio</h5>
                <p>Home</p>
                <p>Livro</p>
                <p>Empréstimos</p>
            </section>
            <section className="sobre-nós">
                <h5>Sobre nós</h5>
                <p>Informações da empresa</p>
                <p>Contato</p>
                <p>Blog</p>
            </section>
            <section>
                <h5>Suporte</h5>
                <p>FAQ</p>
                <p>Chat</p>
                <p>Telefone</p>
            </section>
        </div>
        <footer>
            <section className="footer2">
            &copy; <em id="date"></em>Bibliotech
            </section> 
        </footer>
    </>)
}