export const collectIdsandDocs = doc => ({
	id: doc.id,
	...doc.data()
})

export const getImageDimensions = file => new Promise((resolve,reject) => {
	try {
		const url = URL.createObjectURL(file);
		const img = new Image;
		img.onload = () => {
			const { width, height } = img;
			URL.revokeObjectURL(img.src);
			if (width && height) 
				resolve({ width, height });
			else 
				reject(new Error("Missing image dimensions"));
		};
		img.src=url;
	}
	catch(err) {
		console.error(err);
		reject(new Error("getImageDimensions error"));
	}
});

export const fetcher = async (url) => fetch(url).then((res) => res.json());

export const capitalizeFirstLetter = (string) => {
	// string.charAt(0).toUpperCase() + string.slice(1)
	const splitStr = string.toLowerCase().split(' ');
	for (let i = 0; i < splitStr.length; i += 1) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
	}
	return splitStr.join(' '); 
}
