import {Component} from 'react'

import {v4 as uuid} from 'uuid'

import './index.css'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class Home extends Component {
  state = {
    editHeading: false,
    editParagraph: false,
    activeId: initialSlidesList[0].id,
    listOfSlides: [...initialSlidesList],
  }

  onClickActiveSlides = id => {
    this.setState({activeId: id})
  }

  onTextUpdate = event => {
    this.setState(prevState => {
      const {listOfSlides, activeId} = prevState
      const {...newList} = listOfSlides
      const index = newList.findIndex(slide => slide.id === activeId)

      if (event.target.id === 'heading') {
        newList[index].heading = event.target.value
      } else {
        newList[index].description = event.target.value
      }

      return {listOfSlides: [...newList]}
    })
  }

  onToggle = event => {
    if (event.target.id === 'heading') {
      this.setState(prevState => ({
        editHeading: !prevState.editHeading,
        editParagraph: false,
      }))
    } else {
      this.setState(prevState => ({
        editParagraph: !prevState.editParagraph,
        editHeading: false,
      }))
    }
  }

  onLossFocus = event => {
    this.setState(prevState => {
      const {listOfSlides, activeId} = prevState
      const {...newList} = listOfSlides
      const index = newList.findIndex(slide => slide.id === activeId)
      const result = {}
      if (event.target.id === 'heading') {
        newList[index].heading =
          event.target.value === '' ? 'Heading' : event.target.value
        result.editHeading = false
      } else {
        newList[index].description =
          event.target.value === '' ? 'Description' : event.target.value
        result.editParagraph = false
      }

      return {
        listOfSlides: [...newList],
        ...result,
      }
    })
  }

  onclickNew = () => {
    this.setState(prevState => {
      const {listOfSlides, activeId} = prevState
      const {...newList} = listOfSlides
      const index = newList.findIndex(slide => slide.id === activeId)
      const id = uuid()
      const newItem = {
        id,
        heading: 'Heading',
        description: 'Description',
      }

      newList.splice(index + 1, 0, newItem)
      return {listOfSlides: [...newList], actionId: id}
    })
  }

  render() {
    const {editHeading, editParagraph, activeId, listOfSlides} = this.state
    const ActiveSlide = listOfSlides.find(slide => slide.id === activeId)

    return (
      <diV className="OuterContainer">
        <nav className="Navbar">
          <img
            className="LogoImg"
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-logo.png"
            alt="nxt slides logo"
          />
          <h1 className="main-heading">Nxt Slides</h1>
        </nav>
        <div className="ToolBar">
          <button type="button" className="addBtn" onClick={this.onclickNew}>
            <img
              className="plusImage"
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
              alt="new plus icon"
            />
            New
          </button>
        </div>
        <div className="main-body">
          <div className="LeftContainer">
            <ol className="Slider">
              {listOfSlides.map((slide, index) => (
                <li
                  testId={`slideTab${index + 1}`}
                  className={slide.id === activeId ? 'li-active' : ''}
                  onClick={() => this.onClickActiveSlides(slide.id)}
                  key={slide.id}
                >
                  <p className="sliderIndex">{index + 1}</p>
                  <div className="miniCardContainer">
                    <h1 className="miniHeading">{slide.heading}</h1>
                    <p className="miniDescription">{slide.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="RightContainer">
            <div className="SlideCardContainer">
              {editHeading ? (
                <input
                  type="text"
                  onChange={this.onTextUpdate}
                  value={ActiveSlide.heading}
                  onBlur={this.onLossFocus}
                />
              ) : (
                <h1 id="heading" onClick={this.onToggle}>
                  {ActiveSlide.heading}
                </h1>
              )}
              {editParagraph ? (
                <input
                  className="paragraphInput"
                  id="description"
                  onChange={this.onTextUpdate}
                  value={ActiveSlide.description}
                  onBlur={this.onLossFocus}
                />
              ) : (
                <p id="description" onClick={this.onToggle}>
                  {ActiveSlide.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </diV>
    )
  }
}

export default Home
