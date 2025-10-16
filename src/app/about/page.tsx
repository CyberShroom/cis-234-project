export default function AboutPage() {
    return( 
    <main>
        <div className="content">
            <h2 className='page-title'>About</h2>
            <p className="content-p">The task app allows you to create and save notes and tasks.</p>
            <p className="content-p">Entries are saved in the order they are created.</p>
            <p className="content-p">Deleted entries will be kept in a recycle bin for 30 days, after which, they are deleted forever.</p>
        </div>
    </main>
    );
}