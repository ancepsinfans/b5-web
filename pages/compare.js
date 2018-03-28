import { Component } from 'react'
import Page from '../components/Page'
import AddComparison from '../components/AddComparison'
import Comparisons from '../components/Comparisons'
import LoadFile from '../components/LoadFile'
import repackResults from '../components/repack-results'
const { unpack } = require('jcb64')
const { getInfo } = require('b5-result-text')
const qs = require('querystring')
const { parse } = require('url')
const FileSaver = require('file-saver')

export default class Compare extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comparisons: [],
      scores: false,
      language: 'en',
      viewLanguage: 'en'
    }
    this.addComparison = this.addComparison.bind(this)
    this.getWidth = this.getWidth.bind(this)
    this.translate = this.translate.bind(this)
    this.loadComparison = this.loadComparison.bind(this)
    this.saveComparison = this.saveComparison.bind(this)
  }

  async componentDidMount () {
    document.addEventListener('DOMContentLoaded', this.getWidth(), false)
    window.addEventListener('resize', this.getWidth.bind(this))
  }

  addComparison (e) {
    e.preventDefault()
    let id = false
    const nameField = document.getElementById('comparisonName')
    const compressedDataField = document.getElementById('comparisonData')
    if (compressedDataField.value.startsWith('http')) {
      const url = parse(compressedDataField.value)
      const query = qs.parse(url.search.replace('?', ''))
      id = query.id
    } else {
      id = compressedDataField.value
    }
    const data = unpack(id)
    const comparisons = this.state.comparisons
    comparisons.push({name: nameField.value, data: data})
    const language = this.state.viewLanguage
    const scores = repackResults(comparisons, language)
    this.setState({
      comparisons: comparisons,
      scores: scores
    })
    nameField.value = ''
    compressedDataField.value = ''
  }

  saveComparison (e) {
    e.preventDefault()
    const comparisons = this.state.comparisons
    const file = new window.File([JSON.stringify(comparisons, null, 2)], 'b5-comparison.json', {type: 'text/json;charset=utf-8'})
    FileSaver.saveAs(file)
  }

  loadComparison (e) {
    e.preventDefault()
    const reader = new window.FileReader()
    const files = e.target.files
    reader.onload = () => {
      const text = reader.result
      const json = JSON.parse(text)
      const language = this.state.viewLanguage
      const scores = repackResults(json, language)
      this.setState({
        comparisons: json,
        scores: scores
      })
    }
    if (files.length === 1) {
      reader.readAsText(files[0])
    }
  }

  translate (e) {
    e.preventDefault()
    const language = e.target.dataset.language
    const comparisons = this.state.comparisons
    const scores = repackResults(comparisons, language)
    this.setState({
      scores: scores,
      viewLanguage: language
    })
  }

  getWidth () {
    const width = document.documentElement.clientWidth * 0.9
    this.setState({chartWidth: width >= 500 ? width : 500})
  }

  render () {
    return (
      <Page>
        <h1 className={'no-print'}>Big five comparison</h1>
        {getInfo().languages.map((lang, index) => <button data-language={lang} onClick={this.translate} className={lang === this.state.viewLanguage ? 'isActive no-print' : 'no-print'} key={index}>{lang}</button>)}
        <AddComparison addComparison={this.addComparison} />
        {this.state.scores ? <Comparisons data={this.state.scores} chartWidth={this.state.chartWidth} /> : null}
        {this.state.comparisons.length > 0 ? <button onClick={this.saveComparison}>Save comparison</button> : null}
        {this.state.comparisons.length === 0 ? <LoadFile handler={this.loadComparison} buttonTitle={'Upload'} /> : null}
        <style jsx>
          {`
            button {
              background-color: white;
              border-radius: 2px;
              color: black;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              width: 200px;
              margin: 10px;
              cursor: pointer;
            }
            button:focus {
              outline:0;
            }
            button:active {
              outline: 0;
            }
            .isActive {
              background: yellow;
            }
            @media print {    
              .no-print, .no-print * {
                display: none !important;
              }
            }
          `}
        </style>
      </Page>
    )
  }
}