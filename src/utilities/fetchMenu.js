export async function fetchMenu() {
    try {
        const response = await fetch(
        'https://script.google.com/macros/s/AKfycbzlBL0aCYrxbqaemtct-eN8SQCTzpQ4Prybw3ek5_K1NhpoHjfxYK1k_fPKyuUm7D4/exec'
        )
        const { data } = await response.json()

        let map = {}

        for (const row of data) {
            if (map[row.type]) {
                map[row.type].push(row)
            } else {
                map[row.type] = [row]
            }
        }

        return map
    } catch (error) {
        console.error(error)
    }
}