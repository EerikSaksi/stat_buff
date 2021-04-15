from scipy.optimize import curve_fit
import matplotlib.pyplot as plt
import numpy as np


def exponential(x, a, b):
    return(1 / (1 + np.exp(-a * (x + b))))


xs = [0, 0.20300751879699247, 0.44360902255639095, 0.7142857142857143, 1, ]
ys = [0, 0.2, 0.5, 0.8, 0.95]


pars, covs = curve_fit(exponential, xs, ys)

#print("a= " + str(pars[0]))
#print("b=" + str(pars[1]))

#print([exponential(x_val, pars[0], pars[1]) for x_val in xs])


val = exponential(131 , pars[0], pars[1]) 
print(val)
