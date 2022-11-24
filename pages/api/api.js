export const challenge = gql`
    query Challenge($address: EthereumAddress!) {
        challenge(request: { address: $address }) {
            text
        }
    }
`

export const authenticate = gql`
    mutation Authenticate(
        $address: EthereumAddress!
        $signature: Signature!
    ) {
        authenticate(request: {
            address: $address,
            signature: $signature
        }) {
            accessToken
            refreshToken
        }
    }
`
