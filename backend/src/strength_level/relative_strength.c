#include <math.h>
#include <stdio.h>

float wilks(int x, float W) {
  float a = -216.0475144;
  float b = 16.2606339;
  float c = -0.002388645;
  float d = -0.00113732;
  float e = 7.01863e-6;
  float f = -1.291e-8;
  return W / (a + b * x + c * pow(x, 2) + d * pow(x, 3) +
              e * pow(x, 4) + f * pow(x, 5));
}

float predict_y(float input_weight, float input_bodyweight, int max_weight) {
  float x = wilks(input_bodyweight, input_weight / max_weight);
  return (132519.33930236 * x - 29.140338928094593);
}

int main(){
  printf("%f", predict_y(64, 83, 181));
  return 0;
}
