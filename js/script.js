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
			const altImg = element.name
			createDivHero(scrImage, nameHero, description, altImg, divHero);
		});
})

function createDivHero(scrImage, nameHero, description, altImg, divToAppend) { //Cria os cards dos Herois
	const containerPersonagem = document.createElement('div') 
	
	const divPersonagem = document.createElement('div') // personagem
	const divCardFront = document.createElement('div') // front
	
	const textName = document.createElement('text') 
	const img = document.createElement('img')

	const divCardBack = document.createElement('div')
	const textDescription = document.createElement('p')

	//Atribui dados da API aos elementos criado
	textDescription.textContent = description
	textName.textContent = nameHero
	img.src = scrImage
	img.alt = 'Image of ' + altImg 

	//Adiciona informacoes no front
	divCardFront.appendChild(img)
	divCardFront.appendChild(textName)	

	// Adiciona informacao no back
	divCardBack.appendChild(textDescription)

	// Adiciona ao elemento pai
	divPersonagem.appendChild(divCardFront)
	divPersonagem.appendChild(divCardBack)

	// Adiciona ao container de personagem
	containerPersonagem.appendChild(divPersonagem)
	
	// Adiciona o container na div herois
	divToAppend.appendChild(containerPersonagem)

	// adiciona classes aos elementos
	containerPersonagem.classList.add("container-personagem")
	divCardFront.classList.add("card-front")
	divCardBack.classList.add("card-back")
	divPersonagem.classList.add("personagem");
}