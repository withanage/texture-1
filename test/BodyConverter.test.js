import { test } from 'substance-test'
import { DefaultDOMElement, uuid } from 'substance'
import {
  InternalArticleDocument, InternalArticleSchema,
  createJatsImporter, createJatsExporter, createEmptyJATS
} from '../index'

const TWO_SECTIONS = `
<body id="body">
  <sec id="s1">
    <title>1</title>
    <p>p1</p>
  </sec>
  <sec id="s2">
    <title>2</title>
    <p>p2</p>
  </sec>
</body>
`

test('BodyConverter: import two sections', t => {
  let el = DefaultDOMElement.parseSnippet(TWO_SECTIONS.trim(), 'xml')
  let body = _importBody(el)
  t.equal(body.children.length, 4, 'body should have 4 children')
  let s1 = body.find('#s1')
  t.equal(s1.tagName, 'heading', 'section1 should be converted into a heading')
  t.equal(s1.attr('level'), '1', '.. of level 1')
  t.equal(s1.textContent, '1', '.. and the section title transferred')
  let s2 = body.find('#s2')
  t.equal(s2.tagName, 'heading', 'section2 should be converted into a heading')
  t.equal(s2.attr('level'), '1', '.. of level 1')
  t.equal(s2.textContent, '2', '.. and the section title transferred')
  t.end()
})

test('BodyConverter: export two sections', function (t) {
  let el = DefaultDOMElement.parseSnippet(TWO_SECTIONS.trim(), 'xml')
  let body = _importBody(el)
  let bodyEl = _exportBody(body)
  t.equal(bodyEl.children.length, 2, 'body should have 2 children')
  let s1 = bodyEl.find('#s1')
  t.equal(s1.tagName, 'sec', 's1 should be converted into a sec')
  t.equal(s1.children.length, 2, '.. and should have 2 children')
  let s1Title = s1.find('title')
  t.notNil(s1Title, 's1 should have a title element')
  t.equal(s1Title.textContent, '1', '.. with correct content')
  let s2 = bodyEl.find('#s2')
  t.equal(s2.tagName, 'sec', 's2 should be converted into a sec')
  t.equal(s2.children.length, 2, '.. and should have 2 children')
  let s2Title = s2.find('title')
  t.notNil(s2Title, 's2 should have a title element')
  t.equal(s2Title.textContent, '2', '.. with correct content')
  t.end()
})

const NESTED_SECTIONS = `
<body>
  <sec id="s1">
    <title>1</title>
    <p>p1</p>
    <sec id="s1_2">
      <title>1.2</title>
      <p>p12</p>
    </sec>
  </sec>
  <sec id="s2">
    <title>2</title>
    <p>p2</p>
  </sec>
</body>
`

test('BodyConverter: import nested sections', t => {
  let el = DefaultDOMElement.parseSnippet(NESTED_SECTIONS.trim(), 'xml')
  let body = _importBody(el)
  t.equal(body.children.length, 6, 'body should have 6 children')
  let s1 = body.find('#s1')
  t.equal(s1.tagName, 'heading', 's1 should be converted into a heading')
  t.equal(s1.attr('level'), '1', '.. of level 1')
  t.equal(s1.textContent, '1', '.. and the section title transferred')
  let s12 = body.find('#s1_2')
  t.equal(s12.tagName, 'heading', 's1_2 should be converted into a heading')
  t.equal(s12.attr('level'), '2', '.. of level 2')
  t.equal(s12.textContent, '1.2', '.. and the section title transferred')
  let s2 = body.find('#s2')
  t.equal(s2.tagName, 'heading', 's2 should be converted into a heading')
  t.equal(s2.attr('level'), '1', '.. of level 1')
  t.equal(s2.textContent, '2', '.. and the section title transferred')
  t.end()
})

test('BodyConverter: export nested sections', t => {
  let el = DefaultDOMElement.parseSnippet(NESTED_SECTIONS.trim(), 'xml')
  let bodyEl = _exportBody(_importBody(el))
  t.equal(bodyEl.children.length, 2, 'body should have 2 children')
  let s1 = bodyEl.find('#s1')
  t.equal(s1.tagName, 'sec', 's1 should be converted into a sec')
  t.equal(s1.children.length, 3, '.. and should have 3 children')
  let s1Title = s1.find('title')
  t.notNil(s1Title, 's1 should have a title element')
  t.equal(s1Title.textContent, '1', '.. with correct content')
  let s12 = bodyEl.find('#s1_2')
  t.equal(s12.tagName, 'sec', 's1_2 should be converted into a sec')
  t.equal(s12.children.length, 2, '.. and should have 2 children')
  let s12Title = s12.find('title')
  t.notNil(s12Title, 's1_2 should have a title element')
  t.equal(s12Title.textContent, '1.2', '.. with correct content')
  let s2 = bodyEl.find('#s2')
  t.equal(s2.tagName, 'sec', 's2 should be converted into a sec')
  t.equal(s2.children.length, 2, '.. and should have 2 children')
  let s2Title = s2.find('title')
  t.notNil(s2Title, 's2 should have a title element')
  t.equal(s2Title.textContent, '2', '.. with correct content')
  t.end()
})

function _importBody (el) {
  // TODO: create a minimal document, and the JATS importer
  // then run the converter and see if the body node has the proper content
  let doc = InternalArticleDocument.createEmptyArticle(InternalArticleSchema)
  let importer = createJatsImporter(doc)
  // ATTENTION: same as in the real jats2internal converter we must use a temporary id
  // here, because the body node already exists
  el.id = uuid()
  let tmp = importer.convertElement(el)
  let body = doc.get('body')
  body.append(tmp.children)
  return body
}

function _exportBody (body) {
  let jats = createEmptyJATS()
  let exporter = createJatsExporter(jats, body.getDocument())
  return exporter.convertNode(body)
}
