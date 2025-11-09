class Model {
  constructor() {
    this.blague = []
  }
  async getRandomBlague() {
    const response = await fetch(`https://carambar-back-5c9h.onrender.com/v1/blagues/random`, { mode: 'cors' })
    console.log(response)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error)
    }
    const data = await response.json()
    console.log(data)
    this.blague = data.result
    console.log(this.blague)
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
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    document.querySelector('button').addEventListener('click', async () => {
      try {
        const blague = await this.model.getRandomBlague()
        this.view.render(blague)
      } catch (error) {
        this.view.question.textContent = 'Oups !'
        this.view.response.textContent = 'Une erreur s\'est produite.'
      }
    })
  }
}

const app = new Controller(new Model(), new View())
