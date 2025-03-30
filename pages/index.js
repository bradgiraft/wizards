import Head from 'next/head';

export async function getStaticProps() {
  const res = await fetch('/wizards.json');
  const wizardsData = await res.json();

  return {
    props: {
      wizardsData
    }
  };
}

export default function Home({ wizardsData }) {
  const sortedWizards = [...wizardsData].sort((a, b) => a.rank - b.rank);

  return (
    <div className="container">
      <Head>
        <title>Wizard Rarity Rankings</title>
        <meta name="description" content="Wizard NFT rarity rankings" />
      </Head>

      <main>
        <h1>Wizard Rarity Rankings</h1>
        <div className="grid">
          {sortedWizards.map(wizard => (
            <div key={wizard.id} className="card">
              <img 
                src={`https://ord.io/preview/${wizard.id}`} 
                alt={wizard.name}
                className="image"
              />
              <div className="info">
                <h3>{wizard.name}</h3>
                <p>Rank: {wizard.rank}</p>
                <p>Rarity Score: {wizard.rarity_score.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <style jsx>{`
        .container {
          padding: 2rem;
        }
        h1 {
          text-align: center;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        .card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          text-align: center;
        }
        .image {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }
        .info {
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}