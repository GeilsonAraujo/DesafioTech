// A API exige que os aplicativos do lado do servidor passem dois parâmetros além do parâmetro apikey sao eles:
const timeStamp = '1622244198'; // é carimbo de data / hora (ou outra string longa que pode ser alterada de acordo a solicitação)
const apikey = '41a6da5f3012dd3b03d0c6f17145338a'; // Chave publica
const md5 = 'b2f4c5909c351c6b279bf8ba5225ce1d'; //um resumo md5 do parâmetro ts, sua chave privada e sua chave pública (por exemplo, md5 (ts + privateKey + publicKey)

fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apikey}&hash=${md5}&limit=9` //usado para fazer a solicitação por lista de pesonagens
	).then((response) => {
		return response.json();
	}).then((jsonParsed) =>{
		const divHero = document.querySelector('#herois'); //captura os herois pelo ID, insere na respectiva tag
		jsonParsed.data.results.forEach(element => { //percorre os personagens retornados
			const scrImage = element.thumbnail.path + '.' + element.thumbnail.extension  
			const nameHero = element.name
			const description = element.description != "" ? element.description : 'Description unavailable'
			createDivHero(scrImage, nameHero, description, divHero);
		});
})

function createDivHero(scrImage, nameHero, description, divToAppend) { //Cria o espaço do heroi
	const containerPersonagem = document.createElement('div') 
	
	const divPai = document.createElement('div') //Cria uma div do Zero, personagem
	const divFilho = document.createElement('div') // front
	
	const textName = document.createElement('text') //receberá o nome.
	const img = document.createElement('img')

	const divDescription = document.createElement('div') //Receberá a descrição.
	const textDescription = document.createElement('p')

	textDescription.textContent = description
	textName.textContent = nameHero
	img.src = scrImage 

	divFilho.appendChild(img)
	divFilho.appendChild(textName)			
	divDescription.appendChild(textDescription)

	divPai.appendChild(divFilho)
	divPai.appendChild(divDescription)

	containerPersonagem.appendChild(divPai)
	

	divToAppend.appendChild(containerPersonagem)

	containerPersonagem.classList.add("container-personagem")
	divFilho.classList.add("front")
	divDescription.classList.add("back")
	divPai.classList.add("personagem");

}