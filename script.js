class Model {
  constructor() {
    this.blague = []
  }
  async getRandomBlague() {
    const response = await fetch(`https://carambar-back-5c9h.onrender.com/v1/blagues/random`, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    })
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Aucune blague trouvee.')
      } else if (response.status === 500) {
        throw new Error('Erreur du serveur. Reessayez plus tard.')
      } else {
        throw new Error('Requete invalide.')
      }
    }
    const data = await response.json()
    this.blague = data.result
    return this.blague
  }
}

class View {
  constructor() {
    this.question = document.querySelector('#question')
    this.response = document.querySelector('#response')
  }
  render(blague) {
    this.question.textContent = blague.question
    this.response.textContent = blague.response
  }
  showError(errorMessage) {
    this.question.textContent = 'Oups ! 😕'
    this.response.textContent = errorMessage
  }
  showLoading() {
    this.question.textContent = 'Chargement...'
    this.response.textContent = '⏳'
  }
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    document.querySelector('button').addEventListener('click', async () => {
      try {
        this.view.showLoading()
        const blague = await this.model.getRandomBlague()
        this.view.render(blague)
      } catch (error) {
        console.error('Erreur lors de la recuperation de la blague :', error)
        const errorMessage = error.message || 'Une erreur s\'est produite. Reessayez.'
        this.view.showError(errorMessage)
      }
    })
  }
}

const app = new Controller(new Model(), new View())
