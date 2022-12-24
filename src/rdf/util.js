function pushToList (pointer, predicate, term) {
  if (pointer.out(predicate).isList()) {
    const elements = [...pointer.out(predicate).list(), term]
    pointer.deleteList(predicate)
    pointer.addList(predicate, elements)
  } else {
    pointer.addList(predicate, [term])
  }
}

export { pushToList }
