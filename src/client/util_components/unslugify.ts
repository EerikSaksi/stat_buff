export default function unslugify(input: string): string {
  return input.split('-')
    .map(word => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(" ")
}
