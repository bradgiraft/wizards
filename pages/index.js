import Head from 'next/head';
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'wizards.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const wizardsData = JSON.parse(fileContents);

  return {
    props: {
      wizardsData
    }
  };
}