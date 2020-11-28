exports.getAllNotes = (request, response) => {
  const notes = [
      {
          'id': '1',
          'name': 'Mubarak',
          'Description': 'my farm notes  etc.. abc' 
      },
      {
        'id': '4',
        'name': 'Mubarak',
        'Description': 'my farm notes  etc.. abc' 
      },
      {
        'id': '3',
        'name': 'Mubarak',
        'Description': 'my farm notes  etc.. abc' 
      },
  ]
  return response.json(notes)
}