class Admin.DSL.Navigation
  @content: []

  constructor: (container) ->
    @container = (container || [])

  @map: (callback) ->
    @content = callback.call(new Admin.DSL.Navigation())

  navigate: (name, options, callback) ->
    if options && typeof options != 'function'
      object =
        title: name
        options: options
        children: []
    else
      object =
        title: name

    @container.push(object)

    if typeof options == 'function'
      callback = options

    if callback
      callback.call(new Admin.DSL.Navigation(object.children))
    @container