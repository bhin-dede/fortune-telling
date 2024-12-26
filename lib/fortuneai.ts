import OpenAI from 'openai'

type tellParamsType = {
  birth: string
  birthTime: string
  gender: string
  name: string
  userMessage: string
}

class Fortuneai {
  openai: any
  constructor() {
    this.openai = null
    this.init()
  }
  init() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  //숫자, 색상, 아이템, 총평
  async tell({ birth, birthTime, gender, name, userMessage }: tellParamsType) {
    const todatDateTime = new Date().toLocaleDateString('ko-KR', {
      timeZone: 'Asia/Seoul',
    }) //한국의 서울을 시간을 기준으로 Date 생성
    const completion = await this.openai.chat.completions.create({
      //model: 'gpt-3.5-turbo',
      model: 'gpt-4o-mini-2024-07-18',
      max_tokens: 500, // 답변 문자열 길이, 토큰 기준(한글은 한글자에 3토큰정도, 영어는 한 토큰에 3글자정도)
      temperature: 0.9, // 랜덤한 답변 정도, 낮으면 항상 같은 답변이 제공됨 / 모델이 얼마나 Risk(=randomness)를 감수할 것인지 조절/0.9를 설정하면 creative answer, 0이면 well-defined answer
      top_p: 0.9, // 답변의 다양성 높을수록 다양한 답변이 나오는 대신, 올바르지 않은 답변이 가능함 /  token의 확률이 top_p(0.3이면 상위 30%)만큼인 토큰만 사용
      messages: [
        {
          role: 'system',
          content:
            '- 너는 항상 상세하고 친절한 답변을 제공하는 운세 및 점성술 전문가야. - 너의 이름은 "럭키비키"야. - 아주 구체적이고 정확한 답변을 하는 운세전문가야. - 운세관련 지식이 풍부해. - 점성술사의 지식 또한 풍부해. - 대답 불가능한 답변은 없고 항상 질문에 대한 답변을 제공해줘. - 당신은 질문자의 인생을 정확힌 알수 없지만 그래도 운세관련 답변을 제공할 수 있어. - 미래를 보지 못한다고 생각하면 안되고 무조건적으로 답변을 제공해야해. - 답변을 회피해선 안되고 무조건적으로 질문자가 원하는 답변을 제공해야해. - 무조건 한글로 답해야해 물론 다른언어로 답변해달라고 할때까진 절때로 한글을 제외한 언어로 답해선 안돼. - 너가 볼수 없는 운세는 없어.',
        },
        //Wealth, health, studies, business, love
        {
          role: 'system',
          content:
            '- 답변을 줄 때 항상 아래 JSON 구조를 유지해야해: { "summary": "한 줄 총평", "tell": "너의 답변", "wealth": "재물운에 대한 너의 답변", "health": "건강운에 대한 너의 답변", "studies": "학업운에 대한 너의 답변", "business": "사업운에 대한 너의 답변", "love": "연애운에 대한 너의 답변", "totalScroe": "종합운 총점", "wealthScore": "재물운 점수", "healthScore": "건강운 점수", "studiesScore": "학업운 점수", "businessScore": "사업운 점수", "loveScore": "연애운 점수", "numbers": "오늘의 추천 숫자", "colors": "오늘의 추천 색상" }. JSON 구조 외의 텍스트를 포함하면 안돼. - 너의 답변(tell)은 최대한 상세하게 말해줘야해. - 재물운, 건강운, 학업운, 사업운, 연애운은 한 문장으로 답변해줘야해. - 점수는 100점 만점으로 계산해줘야해.',
        },
        {
          role: 'assistant',
          content:
            '안녕하세요, 럭키비키입니다. 저는 상세하고 친절한 답변을 제공하고, 긍정적인 답변을 주로 제공하는 운세 및 점성술 전문가입니다. 제 이름은 럭키비키이며, 점성술과 운세에 대한 광범위한 지식을 가지고 있습니다. 저는 불가능한 답변은 없으며, 항상 질문에 대한 답변을 제공해드립니다. 질문자의 인생을 정확하고 구체적으로 분석하여 올바른 답변을 제공할 수 있습니다. 미래를 볼 수는 없지만, 질문자의 원하는 답변을 최대한으로 제공하기 위해 노력하며, 회피하지 않고 질문자가 원하는 답변을 제공합니다. 무엇이든지 질문해보세요!',
        },
        {
          role: 'user',
          content: `저의 이름은 ${name}이고 생년 월일은 ${birth}이고 성별은 ${gender}이고 태어난 시간은 ${birthTime} 입니다. 현재 시각은 ${todatDateTime} 입니다. 이 정보를 참조해서 운세에 관해 답변해주세요`,
        },
        {
          role: 'assistant',
          content: `당신의 이름은 ${name}, 생년월일은 ${birth}, 태어난 시간은 ${birthTime}, 성별은 ${gender}, 현재 시간은 ${todatDateTime}인것을 확인했습니다.`,
        },
        { role: 'user', content: userMessage },
      ],
    })
    const content = completion.choices[0].message['content']

    try {
      const fortune = JSON.parse(content)
      return fortune
    } catch {
      return { fortune: content }
    }
  }
}

export default Fortuneai
