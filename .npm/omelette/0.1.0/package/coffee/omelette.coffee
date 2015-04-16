###
# Omelette Simple Auto Completion for Node
###
{EventEmitter} = require "events"

class Omelette extends EventEmitter
  
  {log} = console

  constructor: ->
    @compgen  = process.argv.indexOf "--compgen"
    @install  = process.argv.indexOf("--completion") > -1
    isZsh     = process.argv.indexOf("--compzsh") > -1

    @fragment = parseInt(process.argv[@compgen+1])-(if isZsh then 1 else 0)
    @word     = process.argv[@compgen+2]
    @line     = process.argv[@compgen+3]

  setProgram: (@program) ->
  setFragments: (@fragments...)->

  generate: ->
    @emit "complete", @fragments[@fragment-1], @word, @line
    @emit @fragments[@fragment-1], @word, @line
    @emit "$#{@fragment}", @word, @line
    process.exit()

  reply: (words)->
    console.log words.join "\n"
    process.exit()

  checkInstall: ->
    if @install
      completion = "_#{@program}_complette"
      log """
      ### #{@program} completion - begin. generated by omelette ###
      if type compdef &>/dev/null; then
        #{completion}() {
          compadd -- `#{@program} --compzsh --compgen "${CURRENT}" "${words[CURRENT-1]}" "${BUFFER}"`
        }
        compdef #{completion} #{@program}
      elif type complete &>/dev/null; then
        #{completion}() {
          COMPREPLY=( $(compgen -W '$(#{@program} --compbash --compgen "${COMP_CWORD}" "${COMP_WORDS[COMP_CWORD-1]}" "${COMP_LINE}")' -- "${COMP_WORDS[COMP_CWORD]}") )
        }
        complete -F #{completion} #{@program}
      fi
      ### #{@program} completion - end ###
      """
      process.exit()
  
  init: ->
    do @generate if @compgen > -1

module.exports = (template)->
  [program, fragments...] = template.split /\s+/
  fragments = fragments.map (fragment)-> fragment.replace /^\<+|\>+$/g, ''
  _omelette = new Omelette
  _omelette.setProgram program
  _omelette.setFragments fragments...
  _omelette.checkInstall()
  _omelette