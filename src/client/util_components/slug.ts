export function unslugify(input: string): string {
  return input.split('-')
    .map(word => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(" ")
}

export function slugify(input: string): string {
  return input.split(' ')
    .map(word => {
      return word.toLowerCase()
    })
    .join("-")
}
